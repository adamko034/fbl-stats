import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersStatsAvgPointsConverter } from '../converters/players-stats-avg-points.converter';
import { PlayerStatsAvgPoints } from '../models/player-stats-avg-points.model';
import { PlayersStatsAvgPointsQueryParamsService } from '../services/players-stats-avg-points-query-params.service';

@Injectable()
export class PlayersStatsAvgPointsResolver implements Resolve<Observable<PlayerStatsAvgPoints[]>> {
  constructor(
    private playersStore: PlayersStore,
    private teamStore: TeamsStore,
    private converter: PlayersStatsAvgPointsConverter,
    private queryParamsService: PlayersStatsAvgPointsQueryParamsService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayerStatsAvgPoints[]> {
    Logger.logDev('players stats avg points resolver, resolving');

    return combineLatest([this.playersStore.selectPlayers(), this.teamStore.selectAll()]).pipe(
      map(([allPlayers, teams]) => {
        const filters = this.queryParamsService.getFilters(route.queryParams);
        const players = this.filterByPosition(allPlayers, filters.position);
        const stats = this.converter.fromPlayers(players, teams, filters.includeGames);

        return new ArrayStream<PlayerStatsAvgPoints>(stats).orderBy(filters.type, 'dsc').take(30).collect();
      }),
      tap((_) => Logger.logDev('players stats avg points resolver, got data')),
      first()
    );
  }

  private filterByPosition(allPlayers: Player[], position: PlayerPosition): Player[] {
    return position === PlayerPosition.ALL
      ? allPlayers
      : allPlayers.filter((p) => p.position.toLowerCase() === position.toString());
  }
}
