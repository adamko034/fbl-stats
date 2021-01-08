import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamsSchedulesLoader } from 'src/app/modules/core/teams/schedules/loaders/teams-schedules.loader';
import { TeamsSchedulesState } from 'src/app/modules/core/teams/schedules/models/teams-schedules.state';

@Injectable({ providedIn: 'root' })
export class TeamsSchedulesResolver implements Resolve<TeamsSchedulesState> {
  constructor(private teamsSchedulesLoader: TeamsSchedulesLoader) {}

  public resolve(): Observable<TeamsSchedulesState> {
    return this.teamsSchedulesLoader.load();
  }
}
