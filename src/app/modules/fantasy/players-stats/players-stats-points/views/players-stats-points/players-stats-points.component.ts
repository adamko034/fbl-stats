import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersStatsPointsFilters } from '../../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../../models/players-stats-points-player.model';
import { PlayersStatsPointsType } from '../../models/players-stats-points-type.enum';
import { PlayersStatsQueryParamsService } from '../../services/players-stats-query-params.service';

interface State {
  filters: PlayersStatsPointsFilters;
  players: PlayersStatsPointsPlayer[];
  sort: string;
}

@Component({
  selector: 'app-players-stats-points',
  templateUrl: './players-stats-points.component.html',
  styleUrls: ['./players-stats-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsComponent implements OnInit {
  public state$: Observable<State>;

  constructor(private route: ActivatedRoute, private queryParamsService: PlayersStatsQueryParamsService) {}

  public ngOnInit(): void {
    this.state$ = combineLatest([this.route.data, this.route.queryParams]).pipe(
      map(([data, queryParams]) => {
        const filters = this.queryParamsService.convertToFilters(queryParams);
        const sort = this.getTypeDefaultSort(filters.type);
        return { filters, players: data.players, sort };
      })
    );
  }

  private getTypeDefaultSort(type: PlayersStatsPointsType) {
    if (type === PlayersStatsPointsType.BUNDESLIGA) {
      return 'GP';
    }

    if (type === PlayersStatsPointsType.ATTACKING) {
      return 'G';
    }
  }
}
