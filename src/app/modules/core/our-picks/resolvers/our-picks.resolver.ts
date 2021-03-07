import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { OurPicksPlayersLoader } from '../loaders/our-picks-players.loader';
import { OurPicksPlayers } from '../models/our-picks-players.model';

@Injectable({ providedIn: 'root' })
export class OurPicksResolver implements Resolve<OurPicksPlayers> {
  constructor(private ourPicksLoader: OurPicksPlayersLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<OurPicksPlayers> {
    Logger.logDev('our picks players resolver, resolving ...');
    const matchday = +route.params.matchday;
    return this.ourPicksLoader.load(matchday).pipe(first());
  }
}
