import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class TeamsResolver implements Resolve<Team[]> {
  constructor(private teamsStore: TeamsStore) {}

  public resolve(): Observable<Team[]> {
    Logger.logDev('teams resolver, resolving..');
    return this.teamsStore.selectAll().pipe(first());
  }
}
