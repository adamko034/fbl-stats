import { Injectable } from '@angular/core';
import { TeamsBundesligaTableFilters } from '../models/teams-bundesliga-table-filters.model';

@Injectable()
export class TeamsBundesligaTableQueryParamsService {
  private _default: TeamsBundesligaTableFilters = {
    games: 0,
    venue: 'all'
  };

  public getFilters(queryParams: any): TeamsBundesligaTableFilters {
    let games = queryParams.games ?? this._default.games;

    if (isNaN(games)) {
      games = this._default.games;
    }

    let venue = queryParams.venue ?? this._default.venue;
    if (venue !== 'all' && venue !== 'h' && venue !== 'a') {
      venue = 'all';
    }

    return {
      games: +games,
      venue
    };
  }
}
