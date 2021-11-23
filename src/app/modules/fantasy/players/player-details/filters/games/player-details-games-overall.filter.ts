import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerDetailsGame } from '../../models/player-details-game.model';

export class PlayerDetailsGamesOverallFilter implements Filterable<PlayerDetailsGame> {
  public filter(items: PlayerDetailsGame[]): PlayerDetailsGame[] {
    return items.filter((g) => g.wasPlayed && g.hasPlayed);
    //return items.filter((g) => g.wasPlayed && !!g.points);
  }
}
