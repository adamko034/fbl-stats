import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersListGenericColumn } from 'src/app/shared/components/players-list-generic/models/players-list-generic-column.model';
import { PlayersListGenericConfig } from 'src/app/shared/components/players-list-generic/models/players-list-generic-config.model';
import { PlayersListGenericData } from 'src/app/shared/components/players-list-generic/models/players-list-generic-data.model';
import { PlayersListGenericRowOther } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row-other.mode';
import { PlayersListGenericRow } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row.model';
import { PlayerStatsAvgPoints } from '../../models/player-stats-avg-points.model';
import { PlayersStatsAvgPointsType } from '../../models/players-stats-avg-points-type.enum';
import { PlayersStatsAvgPointsQueryParamsService } from '../../services/players-stats-avg-points-query-params.service';

@Component({
  selector: 'app-players-stats-avg-points',
  templateUrl: './players-stats-avg-points.component.html',
  styleUrls: ['./players-stats-avg-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsAvgPointsComponent implements OnInit {
  private _columns: PlayersListGenericColumn[] = [
    { displayName: 'Total avg', fieldName: PlayersStatsAvgPointsType.OVERALL, hideOnMobile: false, order: 1 },
    { displayName: 'Home avg', fieldName: PlayersStatsAvgPointsType.HOME, hideOnMobile: false, order: 2 },
    { displayName: 'Away avg', fieldName: PlayersStatsAvgPointsType.AWAY, hideOnMobile: false, order: 3 },
    { displayName: 'vs Bottom 6', fieldName: PlayersStatsAvgPointsType.VSBOTTOM, hideOnMobile: false, order: 4 },
    { displayName: 'vs Top 6', fieldName: PlayersStatsAvgPointsType.VSTOP, hideOnMobile: false, order: 5 }
  ];

  public listConfig$: Observable<PlayersListGenericConfig>;
  public data$: Observable<PlayersListGenericData>;
  public lastMatchday$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private queryParamsService: PlayersStatsAvgPointsQueryParamsService
  ) {}

  public ngOnInit(): void {
    this.data$ = this.route.data.pipe(map((data) => this.mapToListData(data.players)));
    this.lastMatchday$ = this.route.data.pipe(map((data) => data.lastMatchday));
    this.listConfig$ = this.route.queryParams.pipe(
      map((params) => {
        const filters = this.queryParamsService.getFilters(params);
        return {
          defaultSortDirection: 'desc',
          defaultSortFieldName: filters.type,
          sortByPlayerEnabled: false,
          sortByTeamEnabled: false,
          hideNotActiveBreakPoint: 'lg'
        };
      })
    );
  }

  public onSortChange(sort: Sort): void {
    this.router.navigate([], { queryParams: { type: sort.active }, queryParamsHandling: 'merge' });
  }

  private mapToListData(players: PlayerStatsAvgPoints[]): PlayersListGenericData {
    const rows: PlayersListGenericRow[] = players.map((player) => this.mapToListRow(player));
    return { columns: this._columns, rows };
  }

  private mapToListRow(player: PlayerStatsAvgPoints): PlayersListGenericRow {
    const { id, name, lastName, popularity, price, position, totalPoints, teamShort } = player;
    const otherValues: PlayersListGenericRowOther[] = [
      {
        key: PlayersStatsAvgPointsType.OVERALL,
        value: `${player.avgTotal} (${player.totalGamesPoints}/${player.gamesPlayedTotal})`,
        order: 1
      },
      {
        key: PlayersStatsAvgPointsType.HOME,
        value: `${player.avgHome} (${player.homeGamesPoints}/${player.homeGamesPlayed})`,
        order: 2
      },
      {
        key: PlayersStatsAvgPointsType.AWAY,
        value: `${player.avgAway} (${player.awayGamesPoints}/${player.awayGamesPlayed})`,
        order: 3
      },
      {
        key: PlayersStatsAvgPointsType.VSBOTTOM,
        value: `${player.avgVsBottom} (${player.vsBottomPoints}/${player.vsBottomGamesPlayed})`,
        order: 4
      },
      {
        key: PlayersStatsAvgPointsType.VSTOP,
        value: `${player.avgVsTop} (${player.vsTopPoints}/${player.vsTopGamesPlayed})`,
        order: 5
      }
    ];

    return {
      playerId: id,
      playerName: name,
      playerNameShort: lastName,
      popularity,
      position,
      price,
      teamShort,
      totalPoints,
      otherValues
    };
  }
}
