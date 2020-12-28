import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterUnavailable implements PlayersFilter {
  constructor(private hideUnavailable: boolean) {}

  public filter(players: Player[]): Player[] {
    if (!this.hideUnavailable) {
      return players;
    }

    return players.filter((p) => p.attendance > 0);
  }
}
