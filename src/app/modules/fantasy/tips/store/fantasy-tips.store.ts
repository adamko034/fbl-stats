import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';
import { FantasyTips } from '../models/fantasy-tips.model';

@Injectable()
export class FantasyTipsStore {
  private _state: { [matchday: string]: FantasyTips } = {};
  private state$: ReplaySubject<{ [matchday: string]: FantasyTips }> = new ReplaySubject(1);

  constructor(private firebase: FirebaseService) {}

  public load(matchday: number): void {
    Logger.logDev(`fantasy tips store, loading for matchday ${matchday}`);
    this.firebase
      .getFantasyTips(matchday)
      .pipe(first())
      .subscribe((tips: FantasyTips) => {
        this._state[tips.matchday] = tips;
        this.send();
      });
  }

  public select(matchday: number): Observable<FantasyTips> {
    return this.state$.pipe(map((state) => state[matchday.toString()]));
  }

  private send(): void {
    this.state$.next({ ...this._state });
  }
}
