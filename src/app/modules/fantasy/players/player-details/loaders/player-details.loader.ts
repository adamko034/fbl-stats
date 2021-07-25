import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { PlayerDetails } from '../models/player-details.model';
import { PlayerDetailsFabric } from './player-details.fabric';

@Injectable()
export class PlayerDetailsLoader {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private playerDetailsFabric: PlayerDetailsFabric
  ) {}

  public load(id: number): Observable<PlayerDetails> {
    Logger.logDev('player details loader, loading, id: ' + id.toString());
    return this.playersStore.selectById(id.toString()).pipe(
      filter((player) => !!player),
      tap((player) => Logger.logDev(`player details loader, got player from state ${player.name}`)),
      mergeMap((player) => {
        return combineLatest([
          of(player),
          this.teamsStore.select(player.teamShort),
          !player.nextGame ? of(null) : this.teamsStore.select(player.nextGame.opponent)
        ]);
      }),
      map(([player, team, opponent]) => this.playerDetailsFabric.create(player, team, opponent)),
      tap((playerDetails) => Logger.logDev(`player details loader, created details for ${playerDetails.name}`))
    );
  }
}
