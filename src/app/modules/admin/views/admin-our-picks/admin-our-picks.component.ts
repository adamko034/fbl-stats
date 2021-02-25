import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';

@UntilDestroy()
@Component({
  selector: 'app-admin-our-picks',
  templateUrl: './admin-our-picks.component.html',
  styleUrls: ['./admin-our-picks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOurPicksComponent implements OnInit {
  private ourPicks: OurPicksPlayers;
  public players: OurPicksPlayer[];

  constructor(private route: ActivatedRoute, private changeDetection: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.players),
        untilDestroyed(this)
      )
      .subscribe((ourPicks) => {
        this.ourPicks = { ...ourPicks };
        this.players = [...this.ourPicks.players];
      });
  }

  public drop(event: CdkDragDrop<string[]>) {
    this.arraymove(this.players, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.ourPicks.players.length; i++) {
      this.players[i].order = i + 1;
    }
    this.changeDetection.detectChanges();
  }

  private arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
