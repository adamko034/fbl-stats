import { Injectable } from '@angular/core';
import { Position } from 'src/app/common/players/models/position.enum';
import { CalculationsType } from 'src/app/shared/models/calculations-type.enum';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';
import { PlayersStatsPointsSubType } from '../models/players-stats-points-subtype.enum';
import { PlayersStatsPointsType } from '../models/players-stats-points-type.enum';

@Injectable()
export class PlayersStatsQueryParamsService {
  private _default: PlayersStatsPointsFilters = {
    calculations: CalculationsType.OVERALL,
    type: PlayersStatsPointsType.BUNDESLIGA,
    subType: PlayersStatsPointsSubType.ATTACKING,
    position: Position.ALL
  };

  public convertToFilters(params: any): PlayersStatsPointsFilters {
    const filtersFromParam: PlayersStatsPointsFilters = {
      type: params.type,
      subType: params.sub,
      calculations: params.calc,
      position: params.pos,
      selectedColumns: params.cols,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder
    };
    const filters = {
      type: filtersFromParam.type ?? this._default.type,
      calculations: filtersFromParam.calculations ?? this._default.calculations,
      subType: filtersFromParam.subType ?? this._default.subType,
      position: filtersFromParam.position ?? this._default.position,
      selectedColumns: filtersFromParam.selectedColumns ?? null,
      sortBy: filtersFromParam.sortBy ?? null,
      sortOrder: filtersFromParam.sortOrder ?? null
    };

    return filters;
  }
}
