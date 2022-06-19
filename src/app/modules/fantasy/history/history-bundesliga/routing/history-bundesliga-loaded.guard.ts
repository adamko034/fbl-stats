import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { HistoryStore } from 'src/app/store/history/history.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class HistoryBundesligaLoadedGuard implements CanActivate {
  constructor(private store: HistoryStore) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const season = route.parent.parent.params.season;

    Logger.logDev(`history bundesliga laoded guard, loading for season ${season}`);
    this.store.loadTeams(season);

    return this.store.selectSeason(season).pipe(
      tap((_) => Logger.logDev('history bundesliga loaded guard, waiting for data')),
      filter((history) => !!history && !!history.teams && history.teams.length === 18),
      tap((_) => Logger.logDev('history bundesliga loaded guard, got it!')),
      mapTo(true)
    );
  }
}
