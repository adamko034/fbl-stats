import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class TeamResolver implements Resolve<Team> {
  constructor(private teamsStore: TeamsStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Team> {
    const teamShort = route.params.team;
    Logger.logDev(`team resolver, resolving ${teamShort}`);

    return this.teamsStore.select(teamShort).pipe(first());
  }
}
