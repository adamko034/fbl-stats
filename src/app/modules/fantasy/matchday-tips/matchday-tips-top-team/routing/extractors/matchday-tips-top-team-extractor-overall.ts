import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamExtractor } from './matchday-tips-top-team-extractor';

export class MatchdayTipsTopTeamExtractorOverall extends MatchdayTipsTopTeamExtractor {
  public calculatePoints(player: Player): number {
    return player.totalPoints;
  }
}
