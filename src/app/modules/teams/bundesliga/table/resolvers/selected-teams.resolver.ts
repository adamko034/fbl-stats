import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { QueryParamsParser } from 'src/app/common/services/query-params-parser.service';

@Injectable()
export class SelectedTeamsResolver implements Resolve<string[]> {
  constructor(private queryParamsParser: QueryParamsParser) {}

  public resolve(route: ActivatedRouteSnapshot): string[] {
    return this.queryParamsParser.getArrayOrDefault(route.queryParams.teams, []);
  }
}
