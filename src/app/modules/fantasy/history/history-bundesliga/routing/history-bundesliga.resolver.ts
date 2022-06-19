import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { HistoryStore } from 'src/app/store/history/history.store';
import { Logger } from 'src/app/utils/logger';
import { HistoryBundesligaState } from '../models/history-bundesliga-state';

@Injectable()
export class HistoryBundesligaResolver implements Resolve<Observable<HistoryBundesligaState>> {
  constructor(private store: HistoryStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<HistoryBundesligaState> {
    const season: string = route.parent.parent.params.season;
    Logger.logDev(`history bundesliga resolver, resolving for season ${season}`);

    return this.store.selectSeason(season).pipe(
      map((historySeason) => ({ season, teams: historySeason.teams })),
      first()
    );
  }
}
