import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { PlayerDetailsLoader } from '../loaders/player-details.loader';
import { PlayerDetails } from '../models/player-details.model';

@Injectable()
export class PlayerDetailsResolver implements Resolve<PlayerDetails> {
  constructor(private playerDetailsLoader: PlayerDetailsLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayerDetails> {
    const id = route.params.id;
    Logger.logDev('player details resolver: loading data for player id: ' + id);

    if (!id || isNaN(id)) {
      return of(null);
    }

    return this.playerDetailsLoader.load(+id).pipe(
      first(),
      tap((playerDetails) => Logger.logDev(`player details resolver, got ${playerDetails?.name} data`))
    );
  }
}
