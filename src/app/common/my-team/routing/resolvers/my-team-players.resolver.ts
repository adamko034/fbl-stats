import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class MyTeamPlayersResolver implements Resolve<Player[]> {
  constructor(private _myTeamStore: MyTeamStore) {}

  public resolve(): Observable<Player[]> {
    Logger.logDev(`my team resolver, resolving...`);
    return this._myTeamStore.selectPlayers().pipe(
      tap((players) => Logger.logDev(`my team resolver, resolved ${players.length} players`)),
      first()
    );
  }
}
