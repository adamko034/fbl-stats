import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { OurPicksStore } from 'src/app/store/our-picks/our-picks.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class OurPicksLoadedGuard implements CanActivate {
  constructor(private store: OurPicksStore) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    Logger.logDev('our picks loaded guard');
    if (!route.params.matchday || isNaN(route.params.matchday)) {
      Logger.logDev('our picks loaded guard, missing matchday or not a number');
      return false;
    }

    this.store.load(+route.params.matchday);

    return this.store.loaded(+route.params.matchday).pipe(
      tap(() => Logger.logDev('our picks loaded guard, waiting for loaded for MD ' + route.params.matchday)),
      filter((isLoaded) => isLoaded),
      tap(() => Logger.logDev('our picks loaded guard, data loaded!'))
    );
  }
}
