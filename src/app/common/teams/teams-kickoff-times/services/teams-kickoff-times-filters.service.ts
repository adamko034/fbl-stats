import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { QueryParamsParser } from 'src/app/common/services/query-params-parser.service';
import { RouterNavigationService } from 'src/app/common/services/router-navigation.service';
import { TeamsKickoffTimesFilters } from '../models/teams-kickoff-times-filters.model';

@Injectable()
export class TeamsKickoffTimesFiltersService {
  constructor(private queryParamsParser: QueryParamsParser, private routerNavigationService: RouterNavigationService) {}

  public fromQueryParams(params: Params): TeamsKickoffTimesFilters {
    const matchdays = this.queryParamsParser.getNumberOrDefault(params.matchdays, 0);
    const teams = this.queryParamsParser.getArrayOrDefault(params.teams, []);

    return { matchdays, teams };
  }

  public changeMatchdays(matchdays: number): void {
    this.routerNavigationService.toSameRouteWithMergedQueryParams({ matchdays });
  }

  public changeTeams(teams: string[]) {
    this.routerNavigationService.toSameRouteWithMergedQueryParams({ teams });
  }
}
