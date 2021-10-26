import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PositionsStats } from 'src/app/store/positions/models/positions-stats.model';
import { PlayerDetails } from '../../models/player-details.model';

interface State {
  player: PlayerDetails;
  positionsStats: PositionsStats;
}

@Component({
  selector: 'app-player-details-content',
  templateUrl: './player-details-content.component.html',
  styleUrls: ['./player-details-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsContentComponent implements OnInit {
  public state$: Observable<State>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map(({ player, positionsStats }) => ({ player, positionsStats })));
  }
}
