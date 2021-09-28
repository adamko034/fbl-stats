import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { PlayersStatsPointsConverter } from '../converters/players-stats-points.converter';
import { PlayersStatsPointsPlayer } from '../models/players-stats-points-player.model';
import { PlayersStatsQueryParamsService } from '../services/players-stats-query-params.service';

@Injectable()
export class PlayersStatsPointsResolver implements Resolve<Observable<PlayersStatsPointsPlayer[]>> {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private queryParamsService: PlayersStatsQueryParamsService,
    private converter: PlayersStatsPointsConverter
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayersStatsPointsPlayer[]> {
    const filters = this.queryParamsService.convertToFilters(route.queryParams);

    return combineLatest([this.playersStore.selectPlayers(), this.teamsStore.selectAll()]).pipe(
      map(([players, teams]) => {
        return players.map((player) => {
          const team = teams.filter((t) => t.shortName === player.teamShort)[0];
          return this.converter.convert(player, team, filters);
        });
      }),
      first()
    );
  }
}
