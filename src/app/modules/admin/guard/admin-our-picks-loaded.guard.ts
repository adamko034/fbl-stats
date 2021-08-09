import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { OurPicksStore } from 'src/app/store/our-picks/our-picks.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class AdminOurPicksLoadedGuard implements CanActivate {
  constructor(private store: OurPicksStore) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!route.params.matchday || isNaN(+route.params.matchday)) {
      Logger.logDev('admin our picks loaded, missing matchday or not a number');
      return false;
    }

    const matchday = +route.params.matchday;
    //const matchday = environment.production ? +route.params.matchday : 100;
    Logger.logDev(`admin our picks loaded, loading for matchday ${matchday}`);

    this.store.load(matchday, false);

    return this.store.loaded(matchday).pipe(
      filter((isLoaded) => isLoaded),
      tap(() => Logger.logDev('admin our picks loaded guard, data loaded!'))
    );
  }
}
