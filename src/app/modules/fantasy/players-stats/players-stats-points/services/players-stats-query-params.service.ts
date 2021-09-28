import { Injectable } from '@angular/core';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';
import { PlayersStatsPointsType } from '../models/players-stats-points-type.enum';

@Injectable()
export class PlayersStatsQueryParamsService {
  private _default: PlayersStatsPointsFilters = {
    calculations: 'overall',
    type: PlayersStatsPointsType.BUNDESLIGA
  };

  public convertToFilters(params: any): PlayersStatsPointsFilters {
    const filtersFromParam: PlayersStatsPointsFilters = { type: params.type, calculations: params.calc };
    const filters = {
      type: filtersFromParam.type ?? this._default.type,
      calculations: filtersFromParam.calculations ?? this._default.calculations
    };

    return filters;
  }
}
