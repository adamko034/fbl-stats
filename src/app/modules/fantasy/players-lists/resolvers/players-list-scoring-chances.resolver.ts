import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { PlayersListsScoringChancesLoader } from '../loaders/players-lists-scoring-chances.loader';
import { PlayerListScoringChances } from '../models/player-list-scoring-chances.model';

@Injectable()
export class PlayersListScoringChancesResolver implements Resolve<PlayerListScoringChances[]> {
  constructor(private loader: PlayersListsScoringChancesLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayerListScoringChances[]> {
    let orderBy: number = +route.queryParams.orderBy;
    let type: 'overall' | 'last5' = route.params.type;

    if (!type || (type.toLowerCase() !== 'overall' && type.toLowerCase() !== 'last5')) {
      return of(null);
    }

    if (isNaN(+orderBy) || (orderBy !== 5 && orderBy !== 10 && orderBy !== 15 && orderBy !== 20)) {
      orderBy = 10;
    }

    Logger.logDev('players list scoring chances resolver: ' + orderBy + ' type: ' + type);
    return this.loader.load(orderBy, type).pipe(first());
  }
}
