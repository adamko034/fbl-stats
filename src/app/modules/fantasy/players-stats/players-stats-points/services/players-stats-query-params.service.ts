import { Injectable } from '@angular/core';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';
import { PlayersStatsPointsSubType } from '../models/players-stats-points-subtype.enum';
import { PlayersStatsPointsType } from '../models/players-stats-points-type.enum';

@Injectable()
export class PlayersStatsQueryParamsService {
  private _default: PlayersStatsPointsFilters = {
    calculations: 'overall',
    type: PlayersStatsPointsType.BUNDESLIGA,
    subType: PlayersStatsPointsSubType.GENERAL
  };

  public convertToFilters(params: any): PlayersStatsPointsFilters {
    const filtersFromParam: PlayersStatsPointsFilters = {
      type: params.type,
      subType: params.sub,
      calculations: params.calc
    };
    const filters = {
      type: filtersFromParam.type ?? this._default.type,
      calculations: filtersFromParam.calculations ?? this._default.calculations,
      subType: filtersFromParam.subType ?? this._default.subType
    };

    return filters;
  }
}
