import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { QueryParamsParser } from 'src/app/common/services/query-params-parser.service';
import { RouterNavigationService } from 'src/app/common/services/router-navigation.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { TeamsKickoffTimesFilters } from '../models/teams-kickoff-times-filters.model';

@Injectable()
export class TeamsKickoffTimesFiltersService {
  constructor(private queryParamsParser: QueryParamsParser, private routerNavigationService: RouterNavigationService) {}

  public fromQueryParams(params: Params, defaults: TeamsKickoffTimesFilters): TeamsKickoffTimesFilters {
    const mdFrom = this.queryParamsParser.getNumberOrDefault(params.mdFrom, defaults.matchdays.from);
    const mdTo = this.queryParamsParser.getNumberOrDefault(params.mdTo, defaults.matchdays.to);
    const teams = this.queryParamsParser.getArrayOrDefault(params.teams, defaults.teams);

    return { matchdays: { from: mdFrom, to: mdTo }, teams };
  }

  public changeMatchdays(matchdays: FromTo): void {
    this.routerNavigationService.toSameRouteWithMergedQueryParams({ mdFrom: matchdays.from, mdTo: matchdays.to });
  }

  public changeTeams(teams: string[]) {
    this.routerNavigationService.toSameRouteWithMergedQueryParams({ teams });
  }
}
