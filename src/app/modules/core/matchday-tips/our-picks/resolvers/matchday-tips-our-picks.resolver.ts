import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';
import { MatchdayTipsOurPicksPlayersLoader } from '../loaders/matchday-tips-our-picks-players.loader';
import { MatchdayTipsOurPicksPlayers } from '../models/matchday-tips-our-picks-players.model';

@Injectable({ providedIn: 'root' })
export class MatchdayTipsOurPicksResolver implements Resolve<MatchdayTipsOurPicksPlayers> {
  constructor(private ourPicksLoader: MatchdayTipsOurPicksPlayersLoader, private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<MatchdayTipsOurPicksPlayers> {
    Logger.logDev('our picks players resolver, resolving ...');
    return this.propertiesStore.selectLastMatchday().pipe(
      tap((lastMatchday) => Logger.logDev(`our picks players resolver, resolving for MD ${lastMatchday + 1}`)),
      switchMap((lastMatchday) => {
        return this.ourPicksLoader.load(lastMatchday + 1).pipe(first());
      }),
      first()
    );
  }
}
