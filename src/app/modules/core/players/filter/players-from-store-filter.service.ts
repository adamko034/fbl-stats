import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Filterable } from '../../shared/filterable/filterable';

@Injectable({ providedIn: 'root' })
export class PlayersFromStoreFilterService {
  constructor(private store: PlayersStore) {}

  public filter(filters: { order: number; filter: Filterable<Player> }[]): Observable<Player[]> {
    return this.store.selectPlayers().pipe(map((players) => this.filterPlayers(players, filters)));
  }

  private filterPlayers(players: Player[], filters: { order: number; filter: Filterable<Player> }[]): Player[] {
    let stream = new ArrayStream<Player>(players);
    const orderedFilters = new ArrayStream(filters).orderBy('order', 'asc').collect();

    orderedFilters.forEach((orderedFilter) => {
      stream = stream.filter(orderedFilter.filter);
    });

    return stream.collect();
  }
}
