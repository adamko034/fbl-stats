import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterPosition implements PlayersFilter {
  constructor(private position: string) {}

  public filter(players: Player[]): Player[] {
    if (!this.position || this.position === PlayerPosition.ALL) {
      return players;
    }

    return players.filter((p) => !this.position || p.position.toLowerCase() === this.position.toLowerCase());
  }
}
