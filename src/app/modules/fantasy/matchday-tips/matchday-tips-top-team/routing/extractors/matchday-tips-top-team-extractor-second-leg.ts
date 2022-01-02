import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamExtractor } from './matchday-tips-top-team-extractor';

export class MatchdayTipsTopTeamExtractorSecondLeg extends MatchdayTipsTopTeamExtractor {
  public calculatePoints(player: Player): number {
    const secondLegGames = player.games.filter((g) => g.matchday > 17);
    return new ArrayStream<Game>(secondLegGames).sumBy((g) => g.points);
  }
}
