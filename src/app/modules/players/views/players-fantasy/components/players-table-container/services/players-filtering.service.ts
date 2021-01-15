import { Injectable } from '@angular/core';
import { PlayerPosition, PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayersFilteringService {
  public filter(players: Player[], filters: PlayersFilters, lastMatchday: number): Player[] {
    const filtered = players
      .filter((p) => filters.position === PlayerPosition.ALL || p.position === filters.position)
      .filter((p) => !filters.price || p.price <= filters.price)
      .filter((p) => !filters.popularity || filters.popularity === 100 || p.popularity <= filters.popularity)
      .filter((p) => !filters.teams || filters.teams.some((t) => t.short === p.teamShort))
      .filter((p) => !filters.name || p.name.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase()))
      .filter((p) => (filters.hideUnavailable ? p.attendance > 0 : true))
      .filter((p) => p.isReturning === filters.showOnlyReturning);
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
