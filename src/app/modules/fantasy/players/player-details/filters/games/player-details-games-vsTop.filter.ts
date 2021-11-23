import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerDetailsGame } from '../../models/player-details-game.model';

export class PlayerDetailsGamesVsTopFilter implements Filterable<PlayerDetailsGame> {
  public filter(items: PlayerDetailsGame[]): PlayerDetailsGame[] {
    //return items.filter((g) => g.wasPlayed && !!g.points && g.opponentRank <= 6);
    return items.filter((g) => g.wasPlayed && g.hasPlayed && g.opponentRank <= 6);
  }
}
