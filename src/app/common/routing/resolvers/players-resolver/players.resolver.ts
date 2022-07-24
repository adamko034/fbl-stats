import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PlayersResolver implements Resolve<Player[]> {
  constructor(private _playersStore: PlayersStore) {}

  public resolve(): Observable<Player[]> {
    Logger.logDev('players resolver, resolving....');
    return this._playersStore.selectPlayers().pipe(
      tap((players) => Logger.logDev(`players resolvers, resolved ${players.length} players`)),
      first()
    );
  }
}
