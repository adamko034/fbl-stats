import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { QueryParamsParser } from 'src/app/common/services/query-params-parser.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { FixturesFirstGamesFilters } from '../models/fixtures-first-games-fitlers.model';

@Injectable()
export class FixturesFirstGamesFiltersService {
  constructor(private router: Router, private queryParamsParser: QueryParamsParser) {}

  public fromQueryParams(queryParams: Params, defaults: FixturesFirstGamesFilters): FixturesFirstGamesFilters {
    const mdFrom = this.queryParamsParser.getNumberOrDefault(queryParams.mdFrom, defaults.matchdays.from);
    const mdTo = this.queryParamsParser.getNumberOrDefault(queryParams.mdTo, defaults.matchdays.to);

    return {
      matchdays: { from: mdFrom, to: mdTo }
    };
  }

  public changeMatchdays(matchdays: FromTo): void {
    this.router.navigate([], {
      queryParams: { mdFrom: matchdays.from, mdTo: matchdays.to },
      queryParamsHandling: 'merge'
    });
  }
}
