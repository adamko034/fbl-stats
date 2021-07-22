import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { HistoryStore } from 'src/app/store/history/history.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class HistoryPlayersLoadedGuard implements CanActivate {
  constructor(private store: HistoryStore) {}

  public canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const season = route.parent.parent.params.season;
    Logger.logDev(`history players loaded guard, loading for season ${season}`);

    this.store.load(season);

    return this.store.selectSeason(season).pipe(
      filter((historySeason) => !!historySeason),
      tap((_) => Logger.logDev('history players loaded guard, data loaded')),
      mapTo(true)
    );
  }
}
