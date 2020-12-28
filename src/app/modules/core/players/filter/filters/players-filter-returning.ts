import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterReturning implements PlayersFilter {
  constructor(private onlyReturning: boolean) {}

  public filter(players: Player[]): Player[] {
    if (!this.onlyReturning) {
      return players;
    }

    return players.filter((p) => p.isReturning);
  }
}
