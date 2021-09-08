import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';

@Injectable({ providedIn: 'root' })
export class PlayersResolver implements Resolve<Observable<Player[]>> {
  constructor(private store: PlayersStore) {}

  public resolve(): Observable<Player[]> {
    return this.store.selectPlayers().pipe(first());
  }
}
