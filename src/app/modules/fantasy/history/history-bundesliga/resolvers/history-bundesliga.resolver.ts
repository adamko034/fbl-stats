import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { HistoryStore } from 'src/app/store/history/history.store';
import { HistoryBundesligaTeam } from 'src/app/store/history/models/history-bundesliga-team.model';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class HistoryBundesligaResolver implements Resolve<Observable<HistoryBundesligaTeam[]>> {
  constructor(private store: HistoryStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<HistoryBundesligaTeam[]> {
    const season = route.parent.parent.params.season;
    Logger.logDev(`history bundesliga resolver, resolving for season ${season}`);

    return this.store.selectSeason(season).pipe(
      map((historySeason) => historySeason.bundesligaTeams),
      first()
    );
  }
}
