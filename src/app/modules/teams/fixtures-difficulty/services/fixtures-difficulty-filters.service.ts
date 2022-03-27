import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { FixturesDifficultyCalculation } from '../models/fixtures-difficulty-calculation.enum';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';

@Injectable()
export class FixturesDifficultyFiltersService {
  private _defaults: FixturesDifficultyFilters = {
    calculation: FixturesDifficultyCalculation.BY_RANK,
    includeVenue: false,
    matchdays: 4,
    formMatchdays: 4
  };

  constructor(private router: Router) {}

  public resolveFromQueryParams(params: Params, matchdaysUntilUnlimitedTransfers?: number): FixturesDifficultyFilters {
    const { calculation, matchdays } = params;

    const includeVenueString = params.includeVenue;
    let includeVenue = this._defaults.includeVenue;

    const formString = params.form;
    let form = this._defaults.formMatchdays;

    if (includeVenueString) {
      includeVenue = JSON.parse(includeVenueString);
    }

    if (formString) {
      form = +formString;
    }

    return {
      calculation: calculation ?? this._defaults.calculation,
      includeVenue: includeVenue,
      matchdays: this.determineMatchdays(matchdays, matchdaysUntilUnlimitedTransfers),
      formMatchdays: form
    };
  }

  public overrideMatchdaysIfUnlimitedTransfers(
    filters: FixturesDifficultyFilters,
    matchdaysUntilUnlimitedTransfers: number
  ) {
    if (matchdaysUntilUnlimitedTransfers < filters.matchdays) {
      filters.matchdays = matchdaysUntilUnlimitedTransfers;
    }
  }

  public changeCalculation(calculation: FixturesDifficultyCalculation): void {
    this.router.navigate([], { queryParams: { calculation }, queryParamsHandling: 'merge' });
  }

  public changeMatchdays(matchdays: number): void {
    this.router.navigate([], { queryParams: { matchdays }, queryParamsHandling: 'merge' });
  }

  public changeIncludeVenue(includeVenue: boolean): void {
    this.router.navigate([], { queryParams: { includeVenue }, queryParamsHandling: 'merge' });
  }

  public changeFormMatchdays(matchdays: number): void {
    this.router.navigate([], { queryParams: { form: matchdays }, queryParamsHandling: 'merge' });
  }

  private determineMatchdays(fromParams: number, untilUnlimitedTransfs: number): number {
    if (fromParams != null) {
      return +fromParams;
    }

    if (untilUnlimitedTransfs != null && untilUnlimitedTransfs < this._defaults.matchdays) {
      return untilUnlimitedTransfs;
    }

    return this._defaults.matchdays;
  }
}
