import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterName implements PlayersFilter {
  constructor(private name: string) {}

  public filter(players: Player[]): Player[] {
    if (!this.name || this.name === '') {
      return players;
    }

    return players.filter((p) => p.name.toLowerCase().includes(this.name.toLowerCase()));
  }
}
