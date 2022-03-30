import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { FixturesFirstGamesFilters } from '../models/fixtures-first-games-fitlers.model';

@Injectable()
export class FixturesFirstGamesFiltersService {
  private _defaults: FixturesFirstGamesFilters = {
    matchdays: 0
  };

  constructor(private router: Router) {}

  public fromQueryParams(queryParams: Params): FixturesFirstGamesFilters {
    const { matchdays } = queryParams;

    return {
      matchdays: matchdays ?? this._defaults.matchdays
    };
  }

  public changeMatchdays(matchdays: number): void {
    this.router.navigate([], { queryParams: { matchdays }, queryParamsHandling: 'merge' });
  }
}
