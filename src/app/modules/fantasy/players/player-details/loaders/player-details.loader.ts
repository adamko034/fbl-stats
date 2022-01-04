import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { PlayerDetails } from '../models/player-details.model';
import { PlayerDetailsFabric } from './player-details.fabric';

@Injectable()
export class PlayerDetailsLoader {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private playerDetailsFabric: PlayerDetailsFabric,
    private propertiesStore: PropertiesStore
  ) {}

  public load(id: number): Observable<PlayerDetails> {
    Logger.logDev('player details loader, loading, id: ' + id.toString());
    return combineLatest([
      this.playersStore.selectById(id.toString()),
      this.teamsStore.selectAllAsObject(),
      this.propertiesStore.selectLastMatchday()
    ]).pipe(
      filter(([player, teams, lastMatchday]) => !!player && !!teams),
      map(([player, teams, lastMatchday]) => this.playerDetailsFabric.create(player, teams, lastMatchday)),
      tap((playerDetails) => Logger.logDev(`player details loader, created details for ${playerDetails.name}`))
    );
  }
}
