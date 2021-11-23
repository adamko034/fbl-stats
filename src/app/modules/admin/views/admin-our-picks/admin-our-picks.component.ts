import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { OurPicksAdminService } from 'src/app/modules/core/services/our-picks-admin.service';
import { MatchdayTipsOurPick } from 'src/app/store/matchday-tips/our-picks/models/matchday-tips-our-picks.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { AdminOurPicksMatchday } from '../../our-picks/models/admin-our-picks-matchday.model';

@UntilDestroy()
@Component({
  selector: 'app-admin-our-picks',
  templateUrl: './admin-our-picks.component.html',
  styleUrls: ['./admin-our-picks.component.scss']
})
export class AdminOurPicksComponent implements OnInit {
  public state: AdminOurPicksMatchday;
  public lastMatchday$: Observable<number>;
  public budgetPlayerMaxPrice$: Observable<number>;
  public nextToMove = 0;

  public get players(): OurPicksPlayer[] {
    return this.state?.ourPicks?.players;
  }

  public isChange = false;
  public Icons = OurPicksType;

  constructor(
    private route: ActivatedRoute,
    private ourPicksAdminService: OurPicksAdminService,
    private toastrService: ToastrService,
    private propertiesService: PropertiesStore,
    private changeDetection: ChangeDetectorRef
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

  public onPlayerSelected(player: OurPicksPlayer): void {
    this.state.ourPicks.players.push({ ...player, order: 1 });
    this.toastrService.success(`Added ${player.name}`);
    this.isChange = true;
  }

  public drop(event: CdkDragDrop<string[]>) {
    this.arraymove(this.state.ourPicks.players, event.previousIndex, event.currentIndex);
    this.reorderPlayers();

    this.nextToMove = event.previousIndex + 2;

    this.isChange = true;
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

  public remove(playerId: number): void {
    this.state.ourPicks.players = this.state.ourPicks.players.filter((p) => p.playerId !== playerId);
    this.state.bargains = this.state.bargains.filter((id) => id !== playerId);
    this.state.differentials = this.state.differentials.filter((id) => id !== playerId);
    this.state.mustHave = this.state.mustHave.filter((id) => id !== playerId);
    this.state.premium = this.state.premium.filter((id) => id !== playerId);

    this.reorderPlayers();
    this.isChange = true;
  }

  public getIconColor(type: OurPicksType, playerId: number): string {
    switch (type) {
      case OurPicksType.MUST_HAVE:
        return this.state.mustHave.includes(playerId) ? null : 'grey';
      case OurPicksType.BARGAIN:
        return this.state.bargains.includes(playerId) ? null : 'grey';
      case OurPicksType.DIFFERENTIAL:
        return this.state.differentials.includes(playerId) ? null : 'grey';
      case OurPicksType.PREMIUM:
        return this.state.premium.includes(playerId) ? null : 'grey';
      case OurPicksType.SURPRISING:
        return this.state.surprising.includes(playerId) ? null : 'grey';
    }
  }

  public togglePlayerType(type: OurPicksType, playerId: number): void {
    switch (type) {
      case OurPicksType.MUST_HAVE:
        this.state.mustHave = this.addOrRemove(this.state.mustHave, playerId);
        break;
      case OurPicksType.BARGAIN:
        this.state.bargains = this.addOrRemove(this.state.bargains, playerId);
        break;
      case OurPicksType.DIFFERENTIAL:
        this.state.differentials = this.addOrRemove(this.state.differentials, playerId);
        break;
      case OurPicksType.PREMIUM:
        this.state.premium = this.addOrRemove(this.state.premium, playerId);
        break;
      case OurPicksType.SURPRISING:
        this.state.surprising = this.addOrRemove(this.state.surprising, playerId);
        break;
    }

    this.isChange = true;
  }

  private reorderPlayers() {
    for (let i = 0; i < this.state.ourPicks.players.length; i++) {
      this.state.ourPicks.players[i].order = i + 1;
    }
  }

  private addOrRemove(arr: number[], playerId: number): number[] {
    arr.includes(playerId) ? (arr = arr.filter((id) => id !== playerId)) : arr.push(playerId);
    return arr;
  }

  private arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
