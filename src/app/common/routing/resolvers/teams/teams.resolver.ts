import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';

@Injectable()
export class TeamsResolver implements Resolve<Team[]> {
  constructor(private _teamsStore: TeamsStore) {}

  public resolve(): Observable<Team[]> {
    return this._teamsStore.selectAll().pipe(first());
  }
}
