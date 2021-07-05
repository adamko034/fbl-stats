import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class MatchdayLatestGuard implements CanActivate {
  constructor(private propertiesService: PropertiesStore, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    Logger.logDev('matchday latest guard');
    return this.propertiesService.selectLastMatchday().pipe(
      map((lastMatchday) => {
        if (!!route.params.matchday && route.params.matchday === 'latest') {
          Logger.logDev(
            `matchday latest guard, no matchday specified (${route.params.matchday}), navigating to /${
              lastMatchday + 1
            }`
          );
          this.router.navigateByUrl(state.url.replace('latest', (lastMatchday + 1).toString()));
          return false;
        }

        if (isNaN(+route.params.matchday)) {
          Logger.logDev('matchday latest guard, matchday is not a number');
          return false;
        }

        Logger.logDev('matchday latest guard, accepting');
        return true;
      })
    );
  }
}
