import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MatchdayFirstGames } from 'src/app/modules/core/matchday/models/matchday-first-games.model';
import { NextMatchdaysFirstGamesLoader } from 'src/app/modules/teams/first-games/resolvers/next-matchdays-first-games.loader';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class NextMatchdaysFirstGamesResolver implements Resolve<MatchdayFirstGames[]> {
  constructor(private loader: NextMatchdaysFirstGamesLoader) {}

  public resolve(): Observable<MatchdayFirstGames[]> {
    Logger.logDev('next matchdays first games resolver, resolving');
    return this.loader.load();
  }
}
