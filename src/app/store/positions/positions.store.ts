import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { FilesService } from '../files.service';
import { PositionsStats } from './models/positions-stats.model';

@Injectable({ providedIn: 'root' })
export class PositionsStore {
  private state: PositionsStats;
  private state$: ReplaySubject<PositionsStats>;

  constructor(private filesService: FilesService) {
    this.state$ = new ReplaySubject(1);
  }

  public load(): void {
    this.filesService
      .getJsonObject<PositionsStats>('positions')
      .pipe(take(1))
      .subscribe((positions) => {
        this.state = positions;
        this.send();
      });
  }

  public select(): Observable<PositionsStats> {
    return this.state$.asObservable();
  }

  private send() {
    this.state$.next({ ...this.state });
  }
}
