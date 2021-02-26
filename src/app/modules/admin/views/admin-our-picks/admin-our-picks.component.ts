import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, tap } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { OurPicksAdminService } from 'src/app/modules/core/services/our-picks-admin.service';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';

@UntilDestroy()
@Component({
  selector: 'app-admin-our-picks',
  templateUrl: './admin-our-picks.component.html',
  styleUrls: ['./admin-our-picks.component.scss']
})
export class AdminOurPicksComponent implements OnInit {
  private ourPicks: OurPicksPlayers;

  public players: OurPicksPlayer[];
  public isChange = false;
  public Icons = OurPicksType;
  public bargains: number[] = [];
  public differentials: number[] = [];
  public premium: number[] = [];
  public mustHave: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private ourPicksAdminService: OurPicksAdminService,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.players),
        untilDestroyed(this)
      )
      .subscribe((ourPicks) => {
        this.ourPicks = { ...ourPicks };
        this.players = [...this.ourPicks.players];
        this.bargains = [...this.ourPicks.players.filter((m) => m.isBargain).map((p) => p.playerId)];
        this.differentials = [...this.ourPicks.players.filter((m) => m.isDifferential).map((p) => p.playerId)];
        this.mustHave = [...this.ourPicks.players.filter((m) => m.isMustHave).map((p) => p.playerId)];
        this.premium = [...this.ourPicks.players.filter((m) => m.isPremium).map((p) => p.playerId)];
      });
  }

  public drop(event: CdkDragDrop<string[]>) {
    this.arraymove(this.players, event.previousIndex, event.currentIndex);
    this.reorderPlayers();

    this.isChange = true;
  }

  public save() {
    const ourPicksDto: OurPicks = {
      matchday: this.ourPicks.matchday,
      published: false,
      players: this.players.map((p) => ({ order: p.order, playerId: p.playerId })),
      bargains: this.bargains,
      differentials: this.differentials,
      mustHave: this.mustHave,
      premium: this.premium
    };

    this.ourPicksAdminService
      .save(ourPicksDto)
      .pipe(
        catchError(async () => this.toastrService.error('Error occured while saving changed', 'Ooops')),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.toastrService.success('Changes has been saved', 'Our Picks');
      });

    this.isChange = false;
  }

  public publish(): void {
    this.ourPicksAdminService.publish(this.ourPicks.matchday);
  }

  public remove(playerId: number): void {
    this.players = this.players.filter((p) => p.playerId !== playerId);
    this.bargains = this.bargains.filter((id) => id !== playerId);
    this.differentials = this.differentials.filter((id) => id !== playerId);
    this.mustHave = this.mustHave.filter((id) => id !== playerId);
    this.premium = this.premium.filter((id) => id !== playerId);

    this.reorderPlayers();
    this.isChange = true;
  }

  public getIconColor(type: OurPicksType, playerId: number): string {
    switch (type) {
      case OurPicksType.MUST_HAVE:
        return this.mustHave.includes(playerId) ? null : 'grey';
      case OurPicksType.BARGAIN:
        return this.bargains.includes(playerId) ? null : 'grey';
      case OurPicksType.DIFFERENTIAL:
        return this.differentials.includes(playerId) ? null : 'grey';
      case OurPicksType.PREMIUM:
        return this.premium.includes(playerId) ? null : 'grey';
    }
  }

  public togglePlayerType(type: OurPicksType, playerId: number): void {
    switch (type) {
      case OurPicksType.MUST_HAVE:
        this.mustHave = this.addOrRemove(this.mustHave, playerId);
        break;
      case OurPicksType.BARGAIN:
        this.bargains = this.addOrRemove(this.bargains, playerId);
        break;
      case OurPicksType.DIFFERENTIAL:
        this.differentials = this.addOrRemove(this.differentials, playerId);
        break;
      case OurPicksType.PREMIUM:
        this.premium = this.addOrRemove(this.premium, playerId);
        break;
    }

    this.isChange = true;
  }

  private reorderPlayers() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].order = i + 1;
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
