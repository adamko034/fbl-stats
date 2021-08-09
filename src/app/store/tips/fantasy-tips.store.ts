import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';
import { FantasyTipLink } from './models/fantasy-tip-link.model';
import { FantasyTips } from './models/fantasy-tips.model';

@Injectable({ providedIn: 'root' })
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
        if (!tips) {
          this._state[matchday] = { matchday, links: [], categories: [] };
          return;
        }

        tips.categories = this.extractCategories(tips);
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

  private extractCategories(tips: FantasyTips): string[] {
    return new ArrayStream<FantasyTipLink>(tips.links).distinctFlat('categories').concat(['all']);
  }
}
