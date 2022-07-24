import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { QueryParamsParser } from 'src/app/common/services/query-params-parser.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { PlayersFilterPrediciton } from '../../models/players-filter-prediction.enum';
import { Position } from '../../models/position.enum';
import { PlayersTableFilters } from '../models/internal/players-table-filters.model';

@Injectable()
export class PlayersTableFiltersProvider {
  constructor(private _queryParamsParser: QueryParamsParser) {}

  public fromQueryParams(params: Params, defaults: PlayersTableFilters): PlayersTableFilters {
    return {
      hideUnavailable: this._queryParamsParser.getBooleanOrDefault(params.hideUnavailable, defaults.hideUnavailable),
      matchdays: this.getMatchdays(params, defaults.matchdays),
      maxPopularity: this._queryParamsParser.getNumberOrDefault(params.maxPopularity, defaults.maxPopularity),
      maxPrice: this._queryParamsParser.getNumberOrDefault(params.maxPrice, defaults.maxPrice),
      position: this._queryParamsParser.getEnumStringOrDefault<Position>(params.position, defaults.position),
      prediction: this._queryParamsParser.getEnumNumberOrDefault<PlayersFilterPrediciton>(
        params.prediction,
        defaults.prediction
      ),
      teams: this._queryParamsParser.getArrayOrDefault(params.teams, defaults.teams),
      playerName: this._queryParamsParser.getStringOrDefault(params.name, defaults.playerName),
      sortBy: this.getSortBy(params, defaults),
      sortOrder: this.getSortOrder(params, defaults.sortOrder)
    };
  }

  private getMatchdays(params: Params, defaults: FromTo): FromTo {
    return {
      from: this._queryParamsParser.getNumberOrDefault(params.mdFrom, defaults.from),
      to: this._queryParamsParser.getNumberOrDefault(params.mdTo, defaults.to)
    };
  }

  private getSortBy(params: Params, defaults: PlayersTableFilters): string {
    const field = this._queryParamsParser.getStringOrDefault(params.sortBy, defaults.sortBy);
    if (isNaN(+field)) {
      return field;
    }

    const fieldNumber = +field;
    const matchdays = this.getMatchdays(params, defaults.matchdays);

    return matchdays.from <= fieldNumber && fieldNumber <= matchdays.to ? field : defaults.sortBy;
  }

  private getSortOrder(params: Params, defaultSortOrder: 'asc' | 'desc'): 'asc' | 'desc' {
    const val = this._queryParamsParser.getStringOrDefault(params.sortOrder, defaultSortOrder);

    if (val !== 'asc' && val !== 'desc') {
      return defaultSortOrder;
    }

    return val;
  }
}
