import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FilesService } from '../files.service';
import { HistoryBundesligaTeam } from './models/history-bundesliga-team.model';
import { HistoryPlayer } from './models/history-player.model';
import { History } from './models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryStore {
  private state: { [season: string]: History } = {};

  public history$ = new ReplaySubject<{ [season: string]: History }>(1);

  constructor(private filesService: FilesService) {}

  public loadPlayers(season: string): void {
    if (!this.state[season] || !this.state[season].players) {
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

  public loadBundesligaTeams(season: string): void {
    if (!this.state[season] || !this.state[season].bundesligaTeams) {
      Logger.logDev(`history state, loading season ${season} bundesliga from file`);
      const filePath = `\\history\\${season}\\bundesliga`;

      this.filesService
        .getJson<HistoryBundesligaTeam>(filePath)
        .pipe(first())
        .subscribe((bundesligaTeams) => {
          this.state[season] = { ...this.state[season], season, bundesligaTeams };
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
