import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SwitcherItem } from 'src/app/common/components/ui/switcher/models/switcher-item.model';
import { Position } from 'src/app/common/players/models/position.enum';
import { PlayersStatsAvgPointsFilters } from '../../../models/players-stats-avg-points-filters.model';
import { PlayersStatsAvgPointsType } from '../../../models/players-stats-avg-points-type.enum';
import { PlayersStatsAvgPointsQueryParamsService } from '../../../services/players-stats-avg-points-query-params.service';

@Component({
  selector: 'app-players-stats-avg-points-filters',
  templateUrl: './players-stats-avg-points-filters.component.html',
  styleUrls: ['./players-stats-avg-points-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsAvgPointsFiltersComponent implements OnInit {
  private _types: SwitcherItem[] = [
    { description: 'Total', value: PlayersStatsAvgPointsType.OVERALL },
    { description: 'Home', value: PlayersStatsAvgPointsType.HOME },
    { description: 'Away', value: PlayersStatsAvgPointsType.AWAY },
    { description: 'vs Bottom 6', value: PlayersStatsAvgPointsType.VSBOTTOM },
    { description: 'vs Top 6', value: PlayersStatsAvgPointsType.VSTOP }
  ];

  private _games: SwitcherItem[] = [
    { description: 'All', value: 0 },
    { description: 'Last 2', value: 2 },
    { description: 'Last 3', value: 3 },
    { description: 'Last 4', value: 4 },
    { description: 'Last 5', value: 5 }
  ];

  public get games(): SwitcherItem[] {
    return this._games;
  }

  public get types(): SwitcherItem[] {
    return this._types;
  }

  public filters$: Observable<PlayersStatsAvgPointsFilters>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private queryParamsService: PlayersStatsAvgPointsQueryParamsService
  ) {}

  public ngOnInit(): void {
    this.filters$ = this.route.queryParams.pipe(map((params) => this.queryParamsService.getFilters(params)));
  }

  public onPositionChange(newPosition: Position): void {
    this.router.navigate([], { queryParams: { pos: newPosition }, queryParamsHandling: 'merge' });
  }

  public onTypeChange(value: string): void {
    this.router.navigate([], { queryParams: { type: value }, queryParamsHandling: 'merge' });
  }

  public onGamesChange(value: number): void {
    this.router.navigate([], { queryParams: { games: value }, queryParamsHandling: 'merge' });
  }
}
