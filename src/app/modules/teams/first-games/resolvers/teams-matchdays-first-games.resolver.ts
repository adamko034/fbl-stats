import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from 'src/app/utils/logger';
import { TeamMatchdaysFirstGames } from '../models/team-matchdays-first-games.model';
import { TeamMatchdaysFirstsGamesLoader } from './teams-matchdays-firsts-games.loader';

@Injectable()
export class TeamsMatchdaysFirstGamesResolver implements Resolve<TeamMatchdaysFirstGames[]> {
  constructor(private loader: TeamMatchdaysFirstsGamesLoader) {}

  public resolve(): Observable<TeamMatchdaysFirstGames[]> {
    Logger.logDev('teams matchdays first games resolver, resolving');
    return this.loader.load();
  }
}
