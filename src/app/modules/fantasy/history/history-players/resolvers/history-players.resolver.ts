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

  // private players: HistoryPlayers = {
  //   players: [
  //     {
  //       name: 'Lewandowski',
  //       team: 'fcb',
  //       totalPoints: 123,
  //       position: PlayerPosition.FOR,
  //       price: 23.2,
  //       popularity: 78,
  //       avg: 8,
  //       leadersPopularity: 100,
  //       firstLegPoints: 80,
  //       secondLegPoints: 43,
  //       homeGamesPoints: 90,
  //       awayGamesPoints: 33,
  //       tenPointsEfficiency: 45,
  //       fifteenPointsEfficiency: 10,
  //       homeAvg: 7,
  //       awayAvg: 5
  //     },
  //     {
  //       name: 'Muller',
  //       team: 'fcb',
  //       totalPoints: 56,
  //       position: PlayerPosition.MID,
  //       price: 12.2,
  //       popularity: 20,
  //       avg: 7,
  //       leadersPopularity: 12,
  //       firstLegPoints: 77,
  //       secondLegPoints: 78,
  //       homeGamesPoints: 56,
  //       awayGamesPoints: 87,
  //       tenPointsEfficiency: 12,
  //       fifteenPointsEfficiency: 5,
  //       homeAvg: 7,
  //       awayAvg: 5
  //     },
  //     {
  //       name: 'Sane',
  //       team: 'fcb',
  //       totalPoints: 99,
  //       position: PlayerPosition.DEF,
  //       price: 17.2,
  //       popularity: 20,
  //       avg: 12,
  //       leadersPopularity: 0,
  //       firstLegPoints: 0,
  //       secondLegPoints: 123,
  //       homeGamesPoints: 100,
  //       awayGamesPoints: 23,
  //       tenPointsEfficiency: 1,
  //       fifteenPointsEfficiency: 0,
  //       homeAvg: 7,
  //       awayAvg: 5
  //     }
  //   ]
  //};
}
