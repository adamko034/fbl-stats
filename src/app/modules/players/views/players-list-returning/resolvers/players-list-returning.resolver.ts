import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayersListsLoader } from 'src/app/modules/players/services/players-lists.loader';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable()
export class PlayersListReturningResolver implements Resolve<Player[]> {
  constructor(private playersListsLoader: PlayersListsLoader) {}

  public resolve(): Observable<Player[]> {
    return this.playersListsLoader.getReturning();
  }
}
