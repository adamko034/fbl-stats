import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { PlayersStatsPointsFilters } from '../../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../../models/players-stats-points-player.model';
import { PlayersStatsQueryParamsService } from '../../services/players-stats-query-params.service';

interface State {
  filters: PlayersStatsPointsFilters;
  players: PlayersStatsPointsPlayer[];
}

@Component({
  selector: 'app-players-stats-points',
  templateUrl: './players-stats-points.component.html',
  styleUrls: ['./players-stats-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsComponent implements OnInit {
  public state$: Observable<State>;

  public screens = ScreenSize;

  constructor(private route: ActivatedRoute, private queryParamsService: PlayersStatsQueryParamsService) {}

  public ngOnInit(): void {
    this.state$ = combineLatest([this.route.data, this.route.queryParams]).pipe(
      map(([data, queryParams]) => {
        const filters = this.queryParamsService.convertToFilters(queryParams);
        return { filters, players: data.players };
      })
    );
  }
}
