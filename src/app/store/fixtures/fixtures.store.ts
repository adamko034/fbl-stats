import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FilesService } from '../files.service';
import { MatchdayFixtures } from './models/matchday-fixtures.model';

@Injectable({ providedIn: 'root' })
export class FixturesStore {
  private state: MatchdayFixtures[] = [];
  private state$ = new ReplaySubject<MatchdayFixtures[]>(1);

  constructor(private filesService: FilesService) {}

  public load(): void {
    if (!this.state || this.state.length === 0) {
      Logger.logDev('fixtures store, importing from file');
      this.filesService
        .getJson<MatchdayFixtures>('schedules')
        .pipe(first())
        .subscribe((fixtures) => {
          Logger.logDev(`fixtures store, imported ${fixtures?.length}`);
          this.state = fixtures;
          this.send();
        });
    }
  }

  public selectAll(): Observable<MatchdayFixtures[]> {
    return this.state$.asObservable();
  }

  public selectByMatchday(matchday: number): Observable<MatchdayFixtures> {
    return this.state$.pipe(map((fixtres) => fixtres.find((m) => m.matchdayNumber === matchday)));
  }

  private send(): void {
    this.state$.next([...this.state]);
  }
}
