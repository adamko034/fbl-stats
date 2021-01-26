import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamsSchedulesByForm } from 'src/app/modules/teams/views/teams-schedules/loaders/strategies/teams-schedules-by-form';
import { TeamsSchedulesLoader } from 'src/app/modules/teams/views/teams-schedules/loaders/teams-schedules.loader';
import { TeamsSchedulesState } from 'src/app/modules/teams/views/teams-schedules/models/teams-schedules.state';
import { schedulesVariables } from 'src/app/modules/teams/views/teams-schedules/static/schedules-variables.static';

@Injectable()
export class TeamsSchedulesByFormResolver implements Resolve<TeamsSchedulesState> {
  constructor(private teamsSchedulesLoader: TeamsSchedulesLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<TeamsSchedulesState> {
    const includeVenue = !!route.queryParams.includeVenue
      ? route.queryParams.includeVenue.toLowerCase() === 'true'
      : schedulesVariables.defaultVenueCalculation;
    const matchdays = !!route.queryParams.matchdays ? +route.queryParams.matchdays : 5;
    return this.teamsSchedulesLoader.load(new TeamsSchedulesByForm(includeVenue, matchdays));
  }
}
