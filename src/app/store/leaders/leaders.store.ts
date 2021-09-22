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

  public selectTop500(): Observable<LeadersMatchday> {
    return this.state$.pipe(map((state) => state.top500));
  }

  public selectTop100(): Observable<LeadersMatchday> {
    return this.state$.pipe(map((state) => state.top100));
  }

  public loaded(): Observable<boolean> {
    return this.state$.pipe(map((state) => !!state));
  }

  private send() {
    this.state$.next({ ...this.state });
  }
}
