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

    return {
      id,
      name,
      lastName,
      totalPoints,
      price,
      popularity,
      position,
      teamShort,
      allGamesCount: this.lastMatchday,
      gamesPlayed,
      gamesPlayedPercentage: this.percentage(gamesPlayed, this.lastMatchday),
      gamesStarted,
      gamesStartedPercentage: this.percentage(gamesStarted, this.lastMatchday),
      playedMoreThan70Min,
      playedMoreThan70MinPercentageAll: this.percentage(playedMoreThan70Min, this.lastMatchday),
      playedMoreThan70MinPercentagePlayed: this.percentage(playedMoreThan70Min, gamesPlayed)
    };
  }

  private percentage(a: number, b: number): number {
    if (b === 0) return 0;

    return Math.round((a / b) * 100) || 0;
  }
}
