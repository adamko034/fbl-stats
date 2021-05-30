import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersListsLoader } from '../loaders/players-lists.loader';

@Injectable()
export class PlayersListUnavailableResolver implements Resolve<Player[]> {
  constructor(private playersListsLoader: PlayersListsLoader) {}

  public resolve(): Observable<Player[]> {
    return this.playersListsLoader.getUnavailable();
  }
}
