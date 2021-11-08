import { PlayerGamesService } from 'src/app/modules/core/players/services/player-games.service';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerDetailsGame } from '../../models/player-details-game.model';

export class PlayerDetailsGamesLast5Filter implements Filterable<PlayerDetailsGame> {
  constructor(private playersGamesService: PlayerGamesService) {}

  public filter(items: PlayerDetailsGame[]): PlayerDetailsGame[] {
    const played = items.filter((g) => g.wasPlayed && !!g.points);
    //const played = items.filter((g) => g.wasPlayed && g.hasPlayed);
    return this.playersGamesService.getLastNGames<PlayerDetailsGame>(played, 5);
  }
}
