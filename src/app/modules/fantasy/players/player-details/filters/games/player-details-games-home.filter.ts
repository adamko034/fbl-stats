import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerDetailsGame } from '../../models/player-details-game.model';

export class PlayerDetailsGamesHomeFilter implements Filterable<PlayerDetailsGame> {
  public filter(items: PlayerDetailsGame[]): PlayerDetailsGame[] {
    //return items.filter((g) => g.wasPlayed && !!g.points && g.isHome);
    return items.filter((g) => g.wasPlayed && g.hasPlayed && g.isHome);
  }
}
