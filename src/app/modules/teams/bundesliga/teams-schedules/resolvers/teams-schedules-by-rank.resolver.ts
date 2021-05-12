import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamsSchedulesByRank } from 'src/app/modules/teams/bundesliga/teams-schedules/loaders/strategies/teams-schedules-by-rank';
import { TeamsSchedulesLoader } from 'src/app/modules/teams/bundesliga/teams-schedules/loaders/teams-schedules.loader';
import { TeamsSchedulesState } from 'src/app/modules/teams/bundesliga/teams-schedules/models/teams-schedules.state';
import { schedulesVariables } from 'src/app/modules/teams/bundesliga/teams-schedules/static/schedules-variables.static';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class TeamsSchedulesByRankResolver implements Resolve<TeamsSchedulesState> {
  constructor(private teamsSchedulesLoader: TeamsSchedulesLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<TeamsSchedulesState> {
    Logger.logDev('teams schedules by rank resolver, resolving...');
    const includeVenue = !!route.queryParams.includeVenue
      ? route.queryParams.includeVenue.toLowerCase() === 'true'
      : schedulesVariables.defaultVenueCalculation;
    return this.teamsSchedulesLoader.load(new TeamsSchedulesByRank(includeVenue));
  }
}
