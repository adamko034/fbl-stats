import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStoreFileService } from 'src/app/store/teams/teams-store-file.service';

@Injectable()
export class TeamsResolver implements Resolve<Team[]> {
  constructor(private teamsStore: TeamsStoreFileService) {}

  public resolve(): Observable<Team[]> {
    return this.teamsStore.select().pipe(first());
  }
}
