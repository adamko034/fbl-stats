import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { FixturesKickoffTimesFilters } from '../models/fixtures-kickoff-times-filters.model';

@Injectable()
export class FixturesKickoffTimesFiltersService {
  private _defaults: FixturesKickoffTimesFilters = {
    matchdays: 0
  };

  constructor(private router: Router) {}

  public fromQueryParams(params: Params): FixturesKickoffTimesFilters {
    const { matchdays } = params;

    return { matchdays: isNaN(matchdays) ? this._defaults.matchdays : +matchdays };
  }

  public changeMatchdays(matchdays: number): void {
    this.router.navigate([], { queryParams: { matchdays }, queryParamsHandling: 'merge' });
  }
}
