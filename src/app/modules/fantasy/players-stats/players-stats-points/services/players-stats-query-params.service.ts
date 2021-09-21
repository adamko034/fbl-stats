import { Injectable } from '@angular/core';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';

@Injectable()
export class PlayersStatsQueryParamsService {
  private _default: PlayersStatsPointsFilters = {
    calculations: 'overall',
    type: 'bundesliga'
  };

  public convertToFilters(params: any): PlayersStatsPointsFilters {
    const filters: PlayersStatsPointsFilters = { type: params.type, calculations: params.calc };
    return { ...this._default, ...filters };
  }
}
