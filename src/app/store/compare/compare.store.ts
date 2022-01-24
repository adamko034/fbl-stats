import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';
import { CompareBestGks } from './models/compare-best-gks.model';
import { CompareState } from './models/compare-state.model';

@Injectable({ providedIn: 'root' })
export class CompareStore {
  private state: CompareState = { loaded: false };
  private _state$: ReplaySubject<CompareState> = new ReplaySubject(1);

  constructor(private firebase: FirebaseService) {}

  public loaded(): Observable<boolean> {
    return this._state$.pipe(map((state) => state.loaded));
  }

  public load(): void {
    Logger.logDev('compare store, loading from firebase');
    this.firebase
      .getCompare()
      .pipe(first())
      .subscribe((state) => this._state$.next({ ...state, loaded: true }));
  }

  public selectBestGks(): Observable<CompareBestGks> {
    Logger.logDev('compare store, select best gks');
    return this._state$.pipe(map((state) => state.bestGks));
  }

  public updateBestGks(bestGks: CompareBestGks): void {
    this.firebase
      .saveCompareBestGks(bestGks)
      .pipe(first())
      .subscribe(() => {
        this.state.bestGks = bestGks;
        this._state$.next({ ...this.state });
      });
  }
}
