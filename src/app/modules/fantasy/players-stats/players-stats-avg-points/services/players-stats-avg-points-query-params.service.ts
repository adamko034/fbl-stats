import { Injectable } from '@angular/core';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersStatsAvgPointsFilters } from '../models/players-stats-avg-points-filters.model';
import { PlayersStatsAvgPointsType } from '../models/players-stats-avg-points-type.enum';

@Injectable()
export class PlayersStatsAvgPointsQueryParamsService {
  private default: PlayersStatsAvgPointsFilters = {
    includeGames: 0,
    position: PlayerPosition.ALL,
    type: PlayersStatsAvgPointsType.OVERALL
  };

  public getFilters(queryParams: any): PlayersStatsAvgPointsFilters {
    return {
      includeGames: this.getGames(queryParams.games),
      position: queryParams.pos ?? this.default.position,
      type: queryParams.type ?? this.default.type
    };
  }

  private getGames(gamesFromParams: any): number {
    if (!gamesFromParams || isNaN(gamesFromParams)) {
      return this.default.includeGames;
    }

    if (+gamesFromParams < 0 || +gamesFromParams > 5) {
      return this.default.includeGames;
    }

    return +gamesFromParams;
  }
}
