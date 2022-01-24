import { Player } from 'src/app/store/players/models/player.model';
import { PlayersFilter } from './players-filter';

export class PlayersFilterExcludedIds extends PlayersFilter {
  constructor(private excludedIds: string[]) {
    super();
  }

  public filter(players: Player[]): Player[] {
    return players.filter((player) => !this.excludedIds.includes(player.id));
  }
}
