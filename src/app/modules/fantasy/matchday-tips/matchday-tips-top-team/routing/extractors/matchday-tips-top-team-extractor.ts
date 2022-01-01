import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamPlayer } from '../../models/matchday-tips-top-team-player.model';

export abstract class MatchdayTipsTopTeamExtractor {
  public extract(players: Player[]): MatchdayTipsTopTeamPlayer[] {
    return new ArrayStream<Player>(players).convertQuick((player) => this.convert(player)).collect();
  }

  public abstract calculatePoints(player: Player): number;

  public convert(player: Player): MatchdayTipsTopTeamPlayer {
    const points = this.calculatePoints(player);

    const { id, name, price, lastName, popularity, top500Popularity, teamShort, position, subPosition, attendance } =
      player;
    return {
      id,
      name,
      price,
      lastName,
      popularity,
      position,
      top500Popularity,
      teamShort,
      points,
      subPosition,
      available: attendance === 1
    };
  }
}
