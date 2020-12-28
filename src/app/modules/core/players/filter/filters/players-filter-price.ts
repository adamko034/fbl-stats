import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterPrice implements PlayersFilter {
  constructor(private price: number) {}

  public filter(players: Player[]): Player[] {
    if (!this.price) {
      return players;
    }

    return players.filter((p) => p.price <= this.price);
  }
}
