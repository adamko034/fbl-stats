import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class TeamsResolver implements Resolve<Team[]> {
  constructor(private _teamsStore: TeamsStore) {}

  public resolve(): Observable<Team[]> {
    Logger.logDev('teams resolver, resolving...');
    return this._teamsStore.selectAll().pipe(
      tap((teams) => Logger.logDev(`teams resolver, resolved ${teams.length} teams`)),
      first()
    );
  }
}
