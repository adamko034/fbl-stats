import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
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
    return this.playersStore.selectById(id.toString()).pipe(
      mergeMap((player) => {
        return combineLatest([
          of(player),
          this.teamsStore.select(player.teamShort),
          this.teamsStore.select(player.nextGame.opponent)
        ]);
      }),
      map(([player, team, opponent]) => this.playerDetailsFabric.create(player, team, opponent))
    );
  }
}
