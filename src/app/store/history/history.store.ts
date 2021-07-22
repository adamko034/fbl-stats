import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FilesService } from '../files.service';
import { HistoryPlayer } from './models/history-player.model';
import { History } from './models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryStore {
  private state: { [season: string]: History } = {};

  public history$ = new ReplaySubject<{ [season: string]: History }>(1);

  constructor(private filesService: FilesService) {}

  public load(season: string): void {
    if (!this.state[season]) {
      Logger.logDev(`history state, loading season ${season} from file`);
      const filePath = `\\history\\${season}\\players`;

      combineLatest([this.filesService.getJson<HistoryPlayer>(filePath)])
        .pipe(first())
        .subscribe(([players]) => {
          this.state[season] = { season, players };
          this.send();
        });
    }
  }

  public selectSeason(season: string): Observable<History> {
    return this.history$.pipe(map((s) => s[season]));
  }

  private send() {
    this.history$.next({ ...this.state });
  }
}
