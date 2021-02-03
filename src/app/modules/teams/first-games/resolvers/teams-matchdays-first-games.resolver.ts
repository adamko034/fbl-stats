import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamMatchdaysFirstGames } from 'src/app/modules/teams/first-games/models/team-matchdays-first-games.model';
import { TeamMatchdaysFirstsGamesLoader } from 'src/app/modules/teams/first-games/resolvers/teams-matchdays-firsts-games.loader';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class TeamsMatchdaysFirstGamesResolver implements Resolve<TeamMatchdaysFirstGames[]> {
  constructor(private loader: TeamMatchdaysFirstsGamesLoader) {}

  public resolve(): Observable<TeamMatchdaysFirstGames[]> {
    Logger.logDev('teams matchdays first games resolver, resolving');
    return this.loader.load();
  }
}
