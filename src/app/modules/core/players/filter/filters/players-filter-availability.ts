import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterAvailbility implements PlayersFilter {
  constructor(private available?: boolean) {}

  public filter(players: Player[]): Player[] {
    if (this.available == null || this.available === undefined) {
      return players;
    }

    return players.filter((p) => p.attendance === (this.available ? 1 : 0));
  }
}
