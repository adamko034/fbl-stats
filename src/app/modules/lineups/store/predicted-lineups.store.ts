import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PredictedLineupsSource } from 'src/app/modules/lineups/store/models/predicted-lineups-source.model';
import { PredictedLineupsState } from 'src/app/modules/lineups/store/models/predicted-lineups.state';
import { TeamPredictedLineups } from 'src/app/modules/lineups/store/models/team-predicted-lineups.model';
import { FilesService } from 'src/app/store/files.service';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PredictedLineupsStore {
  private state: PredictedLineupsState;
  private state$ = new ReplaySubject<PredictedLineupsState>(1);

  constructor(private filesService: FilesService) {}

  public load(): void {
    if (!this.state) {
      Logger.logDev('lineups store, loading data');
      this.filesService
        .getJsonObject<PredictedLineupsState>('predictions')
        .pipe(first())
        .subscribe((state) => {
          this.state = state;
          this.send();
        });
    }
  }

  public selectAllSources(): Observable<PredictedLineupsSource[]> {
    return this.state$.pipe(map((state) => state.sources));
  }

  public selectAllTeams(): Observable<TeamPredictedLineups[]> {
    return this.state$.pipe(map((state) => state.teams));
  }

  public selectByTeam(teamShort: string): Observable<TeamPredictedLineups> {
    return this.state$.pipe(
      map((state) => state.teams.find((t) => t.shortName.toLocaleLowerCase() === teamShort.toLocaleLowerCase()))
    );
  }

  private send() {
    this.state$.next({ ...this.state });
  }
}
