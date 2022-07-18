import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FilesService } from '../files.service';
import { HistoryPlayer } from './models/history-player.model';
import { HistoryTeam } from './models/history-team.model';
import { History } from './models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryStore {
  private state: { [season: string]: History } = {};

  public history$ = new ReplaySubject<{ [season: string]: History }>(1);

  constructor(private filesService: FilesService) {}

  public loadSeason(season: string): void {
    if (!this.state[season]) {
      Logger.logDev(`history state, loading season ${season}...`);
      this.loadPlayers(season);
      this.loadTeams(season);
    }
  }

  private loadPlayers(season: string): void {
    if (!this.state[season]?.players) {
      Logger.logDev(`history state, loading season ${season} players from file`);
      const filePath = `\\history\\${season}\\players`;

      this.filesService
        .getJson<HistoryPlayer>(filePath)
        .pipe(first())
        .subscribe((players) => {
          this.state[season] = { ...this.state[season], season, players };
          this.send();
        });
    }
  }

  private loadTeams(season: string): void {
    if (!this.state[season]?.teams) {
      Logger.logDev(`history state, loading season ${season} bundesliga from file`);
      const filePath = `\\history\\${season}\\teams`;

      this.filesService
        .getJson<HistoryTeam>(filePath)
        .pipe(first())
        .subscribe((teams) => {
          this.state[season] = { ...this.state[season], season, teams };
          this.send();
        });
    }
  }

  public selectSeason(season: string): Observable<History> {
    Logger.logDev(`history store, selecting history for season ${season}`);
    return this.history$.pipe(map((s) => s[season]));
  }

  private send() {
    this.history$.next({ ...this.state });
  }
}
