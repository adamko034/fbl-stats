import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { HistoryStore } from 'src/app/store/history/history.store';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class HistoryPlayersResolver implements Resolve<HistoryPlayer[]> {
  constructor(private store: HistoryStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<HistoryPlayer[]> {
    const season = route.parent.parent.params.season;
    Logger.logDev(`history players resolver, resolving for season ${season}`);

    return this.store.selectSeason(season).pipe(
      map((history) => history?.players || []),
      first()
    );
  }
}
