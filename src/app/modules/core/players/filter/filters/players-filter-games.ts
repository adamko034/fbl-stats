import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

export class PlayersFilterGames implements PlayersFilter {
  constructor(private lastMatchday: number, private count: number) {}

  public filter(players: Player[]): Player[] {
    Logger.logDev(`players filter games, lastMatchyday: ${this.lastMatchday} count: ${this.count}`);
    players.forEach((player) => {
      const gamesToInclude = player.games.filter((g) => g.matchday > this.lastMatchday - this.count);
      player.games = gamesToInclude;
    });

    return players;
  }
}
