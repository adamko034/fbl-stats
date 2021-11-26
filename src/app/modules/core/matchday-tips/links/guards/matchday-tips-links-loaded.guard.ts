import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { MatchdayTipsLinksStore } from 'src/app/store/matchday-tips/links/matchday-tips-links.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class MatchdayTipsLinksLoadedGuard implements CanActivate {
  constructor(private propertiesStore: PropertiesStore, private tipsLinksStore: MatchdayTipsLinksStore) {}

  public canActivate(): Observable<boolean> {
    return this.propertiesStore.selectLastMatchday().pipe(
      map((lastMatchday) => lastMatchday + 1),
      tap((matchday) => Logger.logDev(`fantasy tips loaded guard, loading for matchday ${matchday}`)),
      tap((matchday) => this.tipsLinksStore.load(matchday)),
      switchMap((matchday) =>
        this.tipsLinksStore.select(matchday).pipe(
          tap((_) => Logger.logDev(`fantasy tips loaded guard, waiting for data`)),
          filter((tips) => !!tips),
          tap((_) => Logger.logDev('fantasy tips loaded guard, got data')),
          mapTo(true)
        )
      )
    );
  }
}
