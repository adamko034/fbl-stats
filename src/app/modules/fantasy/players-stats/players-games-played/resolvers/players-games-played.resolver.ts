import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersToGamesPlayedConverter } from '../converters/players-to-games-played-converter';
import { PlayerGamesPlayed } from '../models/player-games-played.model';

@Injectable()
export class PlayersGamesPlayedResolver implements Resolve<Observable<PlayerGamesPlayed[]>> {
  constructor(private playersStore: PlayersStore, private propertiesStore: PropertiesStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayerGamesPlayed[]> {
    const orderBy: string = route.queryParams.orderBy || 'gamesStartedPercentage';
    const position: PlayerPosition = route.queryParams.position || PlayerPosition.ALL;

    return combineLatest([this.playersStore.selectPlayers(), this.propertiesStore.selectLastMatchday()]).pipe(
      map(([players, lastMatchday]) => {
        if (position !== PlayerPosition.ALL) {
          players = players.filter((p) => p.position === position);
        }
        return this.getStats(players, lastMatchday, orderBy);
      }),
      first()
    );
  }

  private getStats(players: Player[], lastMatchday: number, orderBy: string): PlayerGamesPlayed[] {
    return new ArrayStream<Player>(players)
      .convert<PlayerGamesPlayed>(new PlayersToGamesPlayedConverter(lastMatchday))
      .orderByThenBy(
        { field: orderBy, order: 'dsc' },
        { field: orderBy.replace('Percentage', ''), order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' }
      )
      .take(30)
      .collect();
  }
}
