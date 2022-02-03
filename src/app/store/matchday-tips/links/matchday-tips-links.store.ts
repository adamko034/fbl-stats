import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';
import { MatchdaysTipsLinks } from './models/matchday-tips-links.model';

@Injectable({ providedIn: 'root' })
export class MatchdayTipsLinksStore {
  private _state: { [matchday: string]: MatchdaysTipsLinks } = {};
  private state$: ReplaySubject<{ [matchday: string]: MatchdaysTipsLinks }> = new ReplaySubject(1);

  constructor(private firebase: FirebaseService) {}

  public load(matchday: number): void {
    Logger.logDev(`fantasy tips store, loading for matchday ${matchday}`);
    this.firebase
      .getFantasyTips(matchday)
      .pipe(first())
      .subscribe((tips: MatchdaysTipsLinks) => {
        if (!tips) {
          this._state[matchday] = { matchday, links: [] };
          this.send();
          return;
        }

        this._state[tips.matchday] = tips;
        this.send();
      });
  }

  public select(matchday: number): Observable<MatchdaysTipsLinks> {
    return this.state$.pipe(map((state) => state[matchday.toString()]));
  }

  private send(): void {
    this.state$.next({ ...this._state });
  }
}
