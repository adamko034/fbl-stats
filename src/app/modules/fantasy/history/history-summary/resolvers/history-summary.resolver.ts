import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { HistoryStore } from 'src/app/store/history/history.store';
import { History } from 'src/app/store/history/models/history.model';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class HistorySummaryResolver implements Resolve<History> {
  constructor(private store: HistoryStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<History> {
    const season = route.parent.parent.params.season;
    Logger.logDev(`history summary resolver, resolving for season ${season}`);

    return this.store.selectSeason(season).pipe(first());
  }
}
