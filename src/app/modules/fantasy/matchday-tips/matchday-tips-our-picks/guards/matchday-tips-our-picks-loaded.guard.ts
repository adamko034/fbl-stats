import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MatchdayTipsOurPicksStore } from 'src/app/store/matchday-tips/our-picks/matchday-tips-our-picks.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class MatchdayTipsOurPicksLoadedGuard implements CanActivate {
  constructor(private ourPicksStore: MatchdayTipsOurPicksStore, private propertiesStore: PropertiesStore) {}

  public canActivate(): Observable<boolean> {
    Logger.logDev('our picks loaded guard');
    return this.propertiesStore.selectLastMatchday().pipe(
      map((lastMatchday) => lastMatchday + 1),
      tap((nextMatchday) => {
        Logger.logDev(`our picks loaded guard, loading for md ${nextMatchday}`);
        this.ourPicksStore.load(nextMatchday, true);
      }),
      switchMap((nextMatchday) => {
        return this.ourPicksStore.loaded(nextMatchday).pipe(
          tap((_) => Logger.logDev(`our picks loaded guard, waiting for data`)),
          filter((loaded) => loaded),
          tap((_) => Logger.logDev('our picks loaded guard, got data'))
        );
      })
    );
  }
}
