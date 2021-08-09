import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { FantasyTipsStore } from 'src/app/store/tips/fantasy-tips.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class FantasyTipsLoadedGuard implements CanActivate {
  constructor(private propertiesStore: PropertiesStore, private fantasyTipsStore: FantasyTipsStore) {}

  public canActivate(): Observable<boolean> {
    return this.propertiesStore.selectLastMatchday().pipe(
      map((lastMatchday) => lastMatchday + 1),
      tap((matchday) => Logger.logDev(`fantasy tips loaded guard, loading for matchday ${matchday}`)),
      tap((matchday) => this.fantasyTipsStore.load(matchday)),
      switchMap((matchday) =>
        this.fantasyTipsStore.select(matchday).pipe(
          tap((_) => Logger.logDev(`fantasy tips loaded guard, waiting for data`)),
          filter((tips) => !!tips),
          tap((_) => Logger.logDev('fantasy tips loaded guard, got data')),
          mapTo(true)
        )
      )
    );
  }
}
