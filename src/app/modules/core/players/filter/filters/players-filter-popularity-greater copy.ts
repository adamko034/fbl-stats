import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterTop100PopularityGreater implements PlayersFilter {
  constructor(private minPopularity: number) {}

  public filter(players: Player[]): Player[] {
    return players.filter((p) => p.top100Popularity >= this.minPopularity);
  }
}
