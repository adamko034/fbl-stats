import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareIdsCacheService } from '../services/players-compare-ids-store.service';

@Injectable()
export class PlayersCompareIdsCacheGuard implements CanActivate {
  constructor(private idsCacheService: PlayersCompareIdsCacheService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    Logger.logDev('player compare ids cache guard, invoked');
    if (route.queryParams.fromQuickLink) {
      Logger.logDev('player compare ids cache guard, from quick link, not caching, accepting');
      return true;
    }

    const idsFromParams = route.queryParamMap.getAll('ids');
    if (route.queryParams.cleared === 'true') {
      Logger.logDev('players compare ids cache guard, no ids but with cleared flag, clearing in cache and accepting');
      this.idsCacheService.set([]);
      return true;
    }

    if (idsFromParams && idsFromParams.length > 0) {
      Logger.logDev('player compare ids cache guard, got ids, caching and accepting with ids from query params');
      this.idsCacheService.set(idsFromParams);
      return true;
    }

    return this.idsCacheService.get().pipe(
      map((idsFromCache) => {
        if (!idsFromCache || idsFromCache.length === 0) {
          Logger.logDev('player compare ids cache guard, no ids in query params, cache empty, accepting with no ids');
          return true;
        }

        Logger.logDev(
          'player compare ids cache guard, no ids in query params, there are in cache, navigating with ids from cache'
        );
        this.router.navigate(['fantasy', 'compare'], {
          queryParams: { ids: idsFromCache }
        });
        return false;
      })
    );
  }
}
