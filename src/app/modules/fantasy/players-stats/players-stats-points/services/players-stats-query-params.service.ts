import { Injectable } from '@angular/core';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';
import { PlayersStatsPointsSubType } from '../models/players-stats-points-subtype.enum';
import { PlayersStatsPointsType } from '../models/players-stats-points-type.enum';

@Injectable()
export class PlayersStatsQueryParamsService {
  private _default: PlayersStatsPointsFilters = {
    calculations: 'overall',
    type: PlayersStatsPointsType.BUNDESLIGA,
    subType: PlayersStatsPointsSubType.GENERAL,
    position: PlayerPosition.ALL
  };

  public convertToFilters(params: any): PlayersStatsPointsFilters {
    const filtersFromParam: PlayersStatsPointsFilters = {
      type: params.type,
      subType: params.sub,
      calculations: params.calc,
      position: params.pos
    };
    const filters = {
      type: filtersFromParam.type ?? this._default.type,
      calculations: filtersFromParam.calculations ?? this._default.calculations,
      subType: filtersFromParam.subType ?? this._default.subType,
      position: filtersFromParam.position ?? this._default.position
    };

    return filters;
  }
}
