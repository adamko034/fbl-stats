import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class TeamPlayersResolver implements Resolve<Player[]> {
  constructor(private playersStore: PlayersStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
    const teamShort = route.params.team;
    Logger.logDev(`team players resolver, resolving for ${teamShort}`);

    return this.playersStore.selectAllByTeam(teamShort).pipe(
      first(),
      tap((players) => Logger.logDev(`team players resolvers, got ${players.length} players`))
    );
  }
}
