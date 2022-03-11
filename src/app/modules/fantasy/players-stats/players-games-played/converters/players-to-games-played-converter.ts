import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerGamesPlayed } from '../models/player-games-played.model';

export class PlayersToGamesPlayedConverter implements Convertable<Player, PlayerGamesPlayed> {
  constructor(private lastMatchday: number) {}

  public convert(players: Player[]): PlayerGamesPlayed[] {
    return players.map((player) => this.convertSignle(player));
  }

  private convertSignle(player: Player): PlayerGamesPlayed {
    const { id, name, lastName, totalPoints, price, popularity, position, teamShort } = player;
    const gamesPlayed = player.games.filter((g) => g.hasPlayed).length;
    const gamesStarted = player.games.filter((g) => g.started).length;
    const playedMoreThan70Min = player.games.filter((g) => g.hasPlayedMoreThan70Min).length;

    const allGamesCount = player.games.filter((g) => g.gameValid).length;
    return {
      id,
      name,
      lastName,
      totalPoints,
      price,
      popularity,
      position,
      teamShort,
      allGamesCount,
      gamesPlayed,
      gamesPlayedPercentage: this.percentage(gamesPlayed, allGamesCount),
      gamesStarted,
      gamesStartedPercentage: this.percentage(gamesStarted, allGamesCount),
      playedMoreThan70Min,
      //playedMoreThan70MinPercentageAll: this.percentage(playedMoreThan70Min, this.lastMatchday),
      playedMoreThan70MinPercentage: this.percentage(playedMoreThan70Min, gamesPlayed)
    };
  }

  private percentage(a: number, b: number): number {
    if (b === 0) return 0;

    return Math.round((a / b) * 100) || 0;
  }
}
