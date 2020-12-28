import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterPopularity implements PlayersFilter {
  constructor(private popularity: number) {}

  public filter(players: Player[]): Player[] {
    if (!this.popularity || this.popularity === 100) {
      return players;
    }

    return players.filter((p) => p.popularity <= this.popularity);
  }
}
