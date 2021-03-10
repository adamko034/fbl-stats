import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersUnavailableFilter implements Filterable<Player> {
  public filter(items: Player[]): Player[] {
    return items.filter((item) => item.attendance === 0);
  }
}
