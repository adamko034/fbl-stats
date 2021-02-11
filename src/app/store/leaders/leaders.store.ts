import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FilesService } from '../files.service';
import { LeadersMatchday } from './models/leaders-matchday.model';
import { Leaders } from './models/leaders.model';

@Injectable({ providedIn: 'root' })
export class LeadersStore {
  private state: Leaders;
  private state$: ReplaySubject<Leaders>;

  constructor(private filesService: FilesService) {
    this.state$ = new ReplaySubject<Leaders>(1);
  }

  public load(): void {
    if (!this.state) {
      Logger.logDev('leaders store, loading leaders');
      this.filesService
        .getJsonObject<Leaders>('leaders')
        .pipe(first())
        .subscribe((leaders) => {
          this.state = leaders;
          this.send();
        });
    }
  }

  public loaded(): Observable<boolean> {
    return this.state$.pipe(map((state) => !!state));
  }

  public selectMatchdayNumbers(): Observable<number[]> {
    return this.state$.pipe(map((state) => state.matchdays.map((m) => m.matchday)));
  }

  public selectLeadersMatchday(matchday: number): Observable<LeadersMatchday> {
    Logger.logDev(`leaders store, selecting matchday ${+matchday}`);
    return this.state$.pipe(map((state) => state.matchdays.find((m) => m.matchday === +matchday)));
  }

  private send() {
    this.state$.next({ ...this.state });
  }
}
