import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersStatsPointsPlayer } from '../../models/players-stats-points-player.model';

@Component({
  selector: 'app-players-stats-points',
  templateUrl: './players-stats-points.component.html',
  styleUrls: ['./players-stats-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsComponent implements OnInit {
  public players$: Observable<PlayersStatsPointsPlayer[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
