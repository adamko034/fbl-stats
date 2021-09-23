import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersStatsPointsFilters } from '../../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../../models/players-stats-points-player.model';
import { PlayersStatsQueryParamsService } from '../../services/players-stats-query-params.service';

@Component({
  selector: 'app-players-stats-points',
  templateUrl: './players-stats-points.component.html',
  styleUrls: ['./players-stats-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsComponent implements OnInit {
  public players$: Observable<PlayersStatsPointsPlayer[]>;
  public filters$: Observable<PlayersStatsPointsFilters>;

  constructor(private route: ActivatedRoute, private queryParamsService: PlayersStatsQueryParamsService) {}

  public ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
    this.filters$ = this.route.queryParams.pipe(
      map((params) => {
        console.log(JSON.stringify(this.queryParamsService.convertToFilters(params)));
        return this.queryParamsService.convertToFilters(params);
      })
    );
  }
}
