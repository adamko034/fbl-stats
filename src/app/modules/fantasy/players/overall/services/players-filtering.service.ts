import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersFilters, PlayerPosition } from '../models/players-filters';

@Injectable()
export class PlayersFilteringService {
  public filter(players: Player[], filters: PlayersFilters, lastMatchday: number): Player[] {
    const filtered = players
      .filter((p) => filters.position === PlayerPosition.ALL || p.position === filters.position)
      .filter((p) => !filters.price || p.price <= filters.price)
      .filter((p) => !filters.popularity || filters.popularity === 100 || p.popularity <= filters.popularity)
      .filter((p) => !filters.teams || filters.teams.some((t) => t.short === p.teamShort))
      .filter((p) => !filters.name || p.name.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase()));
    this.filterMatchdays(filtered, lastMatchday, filters.matchdays);

    return filtered;
  }

  private filterMatchdays(players: Player[], lastMatchday: number, matchdaysCount: number): void {
    players.forEach((player) => {
      const gamesToInclude = player.games.filter((g) => g.matchday > lastMatchday - matchdaysCount);
      player.games = gamesToInclude;
    });
  }
}
