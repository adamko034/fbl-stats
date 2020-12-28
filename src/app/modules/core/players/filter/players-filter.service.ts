import { Injectable } from '@angular/core';
import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable()
export class PlayersFilterService {
  private filters: PlayersFilter[];

  constructor() {}

  public registerFilters(filters: PlayersFilter[]) {
    this.filters = [];
    filters.forEach((x) => this.filters.push(x));
  }

  public filter(players: Player[]): Player[] {
    let filtered = players;
    this.filters.forEach((filter) => (filtered = filter.filter(filtered)));

    return filtered;
  }
}
