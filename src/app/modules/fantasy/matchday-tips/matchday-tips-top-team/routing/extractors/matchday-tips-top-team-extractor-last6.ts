import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamExtractor } from './matchday-tips-top-team-extractor';

export class MatchdayTipsTopTeamExtractorLast6 extends MatchdayTipsTopTeamExtractor {
  public calculatePoints(player: Player): number {
    return new ArrayStream<Game>(player.games)
      .orderBy('matchday', 'dsc')
      .take(6)
      .sumBy((g) => g.points);
  }
}
