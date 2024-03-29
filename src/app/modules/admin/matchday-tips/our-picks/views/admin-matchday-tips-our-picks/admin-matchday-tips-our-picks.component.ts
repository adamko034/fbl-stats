import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { AdminMatchdayTipsOurPicksService } from 'src/app/modules/core/matchday-tips/our-picks/services/admin-matchay-tips-our-picks.service';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MatchdayTipsOurPick } from 'src/app/store/matchday-tips/our-picks/models/matchday-tips-our-picks.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { AdminMatchdayTipsOurPicksMatchday } from '../../models/admin-matchday-tips-our-picks.model';

@UntilDestroy()
@Component({
  selector: 'app-admin-matchday-tips-our-picks',
  templateUrl: './admin-matchday-tips-our-picks.component.html',
  styleUrls: ['./admin-matchday-tips-our-picks.component.scss']
})
export class AdminMatchdayTipsOurPicksComponent implements OnInit {
  public state: AdminMatchdayTipsOurPicksMatchday;
  public lastMatchday$: Observable<number>;
  public budgetPlayerMaxPrice$: Observable<number>;
  public nextToMove = 0;

  public get players(): MatchdayTipsOurPicksPlayer[] {
    return this.state?.ourPicks?.players;
  }

  public isChange = false;
  public Icons = MatchdayTipsOurPicksType;

  constructor(
    private route: ActivatedRoute,
    private ourPicksAdminService: AdminMatchdayTipsOurPicksService,
    private toastrService: ToastrService,
    private propertiesService: PropertiesStore,
    private changeDetection: ChangeDetectorRef,
    private myTeamStore: MyTeamStore
  ) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.adminOurPicks),
        untilDestroyed(this)
      )
      .subscribe((state) => {
        this.state = state;
      });

    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
    this.budgetPlayerMaxPrice$ = this.propertiesService.selectBudgetPlayerMaxPrice();
  }

  public onPlayerSelected(player: MatchdayTipsOurPicksPlayer): void {
    this.state.ourPicks.players = [...this.state.ourPicks.players, { ...player, order: 1 }];
    this.toastrService.success(`Added ${player.name}`);
    this.isChange = true;
  }

  public drop(event: CdkDragDrop<string[]>, position: string) {
    const playersByPosition = this.playersInPostion(position);

    this.arraymove(playersByPosition, event.previousIndex, event.currentIndex);
    this.reorderPlayers(playersByPosition);

    //this.nextToMove = event.previousIndex + 2;
    this.isChange = true;
    this.state.ourPicks.players = [
      ...this.state.ourPicks.players.filter((p) => p.position !== position),
      ...playersByPosition
    ];
  }

  public save() {
    const ourPicksDto: MatchdayTipsOurPick = {
      matchday: this.state.ourPicks.matchday,
      published: false,
      players: this.state.ourPicks.players.map((p) => ({ order: p.order, playerId: p.playerId })),
      bargains: this.state.bargains,
      differentials: this.state.differentials,
      mustHave: this.state.mustHave,
      premium: this.state.premium,
      suprising: this.state.surprising
    };

    this.ourPicksAdminService
      .save(ourPicksDto)
      .pipe(
        catchError(async () => this.toastrService.error('Error occured while saving changed', 'Ooops')),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isChange = false;
        this.toastrService.success('Changes has been saved', 'Our Picks');
        this.changeDetection.detectChanges();
      });
  }

  public publish(): void {
    this.ourPicksAdminService
      .setPublish(!this.state.ourPicks.published, this.state.ourPicks.matchday)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.state.ourPicks.published = !this.state.ourPicks.published;
        this.isChange = false;
        this.toastrService.success(this.state.ourPicks.published ? 'Published' : 'Unpublished');
        this.changeDetection.detectChanges();
      });
  }

  public remove(player: MatchdayTipsOurPicksPlayer): void {
    const { position, playerId } = player;
    this.state.ourPicks.players = this.state.ourPicks.players.filter((p) => p.playerId !== playerId);
    this.state.bargains = this.state.bargains.filter((id) => id !== playerId);
    this.state.differentials = this.state.differentials.filter((id) => id !== playerId);
    this.state.mustHave = this.state.mustHave.filter((id) => id !== playerId);
    this.state.premium = this.state.premium.filter((id) => id !== playerId);

    this.reorderPlayers(this.playersInPostion(position));
    this.isChange = true;
  }

  public togglePlayerType(type: MatchdayTipsOurPicksType, playerId: number): void {
    switch (type) {
      case MatchdayTipsOurPicksType.MUST_HAVE:
        this.state.mustHave = this.addOrRemove(this.state.mustHave, playerId);
        break;
      case MatchdayTipsOurPicksType.BARGAIN:
        this.state.bargains = this.addOrRemove(this.state.bargains, playerId);
        break;
      case MatchdayTipsOurPicksType.DIFFERENTIAL:
        this.state.differentials = this.addOrRemove(this.state.differentials, playerId);
        break;
    }

    this.isChange = true;
  }

  public toMyTeam(): void {
    this.myTeamStore.swap(this.state.ourPicks.players.map((p) => p.playerId.toString()));
  }

  private playersInPostion(position: string): MatchdayTipsOurPicksPlayer[] {
    return this.state.ourPicks.players.filter((p) => p.position === position);
  }

  private reorderPlayers(players: MatchdayTipsOurPicksPlayer[]) {
    for (let i = 0; i < players.length; i++) {
      players[i].order = i + 1;
    }
  }

  private addOrRemove(arr: number[], playerId: number): number[] {
    arr = arr.includes(playerId) ? arr.filter((id) => id !== playerId) : [...arr, playerId];
    return arr;
  }

  private arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
