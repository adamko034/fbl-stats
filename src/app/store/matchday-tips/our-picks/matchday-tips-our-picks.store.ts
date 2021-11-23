import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';
import { MatchdayTipsOurPick } from './models/matchday-tips-our-picks.model';

@Injectable({ providedIn: 'root' })
export class MatchdayTipsOurPicksStore {
  private store: { [matchday: number]: MatchdayTipsOurPick } = {};
  private store$: ReplaySubject<{ [matchday: number]: MatchdayTipsOurPick }>;

  constructor(private firebase: FirebaseService) {
    this.store$ = new ReplaySubject<{ [matchday: number]: MatchdayTipsOurPick }>(1);
  }

  public load(matchday: number, onlyPublished: boolean): void {
    if (!this.store[matchday]) {
      Logger.logDev('our picks store, loading from firebase for MD ' + matchday);
      this.firebase
        .getOurPicks(matchday, onlyPublished)
        .pipe(first())
        .subscribe((ourPicks) => {
          Logger.logDev(`our picks store, got data for MD ${matchday}`);
          this.store[matchday] = ourPicks;
          this.send();
        });
    }
  }

  public loaded(matchday: number): Observable<boolean> {
    return this.store$.pipe(map((store) => !!store[matchday]));
  }

  public select(matchday: number): Observable<MatchdayTipsOurPick> {
    return this.store$.pipe(map((store) => store[matchday]));
  }

  private send(): void {
    this.store$.next({ ...this.store });
  }
}
