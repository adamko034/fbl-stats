import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { QueryParamsParser } from 'src/app/common/services/query-params-parser.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { FixturesDifficultyCalculation } from '../models/fixtures-difficulty-calculation.enum';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';

@Injectable()
export class FixturesDifficultyFiltersService {
  constructor(private router: Router, private queryParamsParser: QueryParamsParser) {}

  public resolveFromQueryParams(params: Params, defaults: FixturesDifficultyFilters): FixturesDifficultyFilters {
    const calculation = this.queryParamsParser.getEnumStringOrDefault<FixturesDifficultyCalculation>(
      params.calculation,
      defaults.calculation
    );
    const mdFrom = this.queryParamsParser.getNumberOrDefault(params.mdFrom, defaults.matchdays.from);
    const mdTo = this.queryParamsParser.getNumberOrDefault(params.mdTo, defaults.matchdays.to);
    const includeVenue = this.queryParamsParser.getBooleanOrDefault(params.includeVenue, defaults.includeVenue);
    const form = this.queryParamsParser.getNumberOrDefault(params.form, defaults.formMatchdays);

    return {
      calculation,
      includeVenue,
      matchdays: { from: mdFrom, to: mdTo },
      formMatchdays: form
    };
  }

  // public overrideMatchdaysIfUnlimitedTransfers(
  //   filters: FixturesDifficultyFilters,
  //   matchdaysUntilUnlimitedTransfers: number
  // ) {
  //   if (matchdaysUntilUnlimitedTransfers < filters.matchdays) {
  //     filters.matchdays = matchdaysUntilUnlimitedTransfers;
  //   }
  // }

  public changeCalculation(calculation: FixturesDifficultyCalculation): void {
    this.router.navigate([], { queryParams: { calculation }, queryParamsHandling: 'merge' });
  }

  public changeMatchdays(matchdays: FromTo): void {
    this.router.navigate([], {
      queryParams: { mdFrom: matchdays.from, mdTo: matchdays.to },
      queryParamsHandling: 'merge'
    });
  }

  public changeIncludeVenue(includeVenue: boolean): void {
    this.router.navigate([], { queryParams: { includeVenue }, queryParamsHandling: 'merge' });
  }

  public changeFormMatchdays(matchdays: number): void {
    this.router.navigate([], { queryParams: { form: matchdays }, queryParamsHandling: 'merge' });
  }
}
