import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { FilesService } from 'src/app/store/files.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsFileSource } from 'src/app/store/teams/stores/teams-source-file';
import { ITeamsSource } from 'src/app/store/teams/stores/teams-source.interface';
import { Logger } from 'src/app/utils/logger';

interface TeamsState {
  [key: string]: Team;
}

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class TeamsStoreFileService {
  private state: TeamsState = {};
  private state$ = new ReplaySubject<TeamsState>(1);

  private source: ITeamsSource;

  constructor(private filesService: FilesService) {
    this.source = new TeamsFileSource(this.filesService);
  }

  public load(): void {
    if (Object.keys(this.state).length === 0) {
      Logger.logDev('teams store file service, loading from file');
      this.source
        .loadAll()
        .pipe(
          take(1),
          untilDestroyed(this),
          tap((fileTeams: Team[]) => {
            fileTeams.forEach((fileTeam) => (this.state[fileTeam.shortName] = fileTeam));
          })
        )
        .subscribe(() => this.send());
    }
  }

  public select(): Observable<Team[]> {
    return this.state$.pipe(
      distinctUntilChanged(),
      map((state) => Object.values(state))
    );
  }

  private send(): void {
    this.state$.next({ ...this.state });
  }
}
