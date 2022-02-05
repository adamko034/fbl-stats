import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamPlayer } from '../../models/matchday-tips-top-team-player.model';

export abstract class MatchdayTipsTopTeamExtractor {
  public extract(players: Player[]): MatchdayTipsTopTeamPlayer[] {
    return new ArrayStream<Player>(players).convertQuick((player) => this.convert(player)).collect();
  }

  public abstract extractGamesPlayed(player: Player): Game[];

  public convert(player: Player): MatchdayTipsTopTeamPlayer {
    const games = this.extractGamesPlayed(player);
    const points = new ArrayStream<Game>(games).sumBy((g) => g.points);
    const gamesPlayed = new ArrayStream<Game>(games).filterQuick((g) => g.hasPlayed).collect().length;

    const {
      id,
      name,
      price,
      lastName,
      popularity,
      top100Popularity,
      top500Popularity,
      teamShort,
      position,
      subPosition,
      attendance
    } = player;
    return {
      id,
      name,
      price,
      lastName,
      popularity,
      position,
      top100Popularity,
      top500Popularity,
      teamShort,
      points,
      subPosition,
      gamesPlayed,
      available: attendance === 1
    };
  }
}
