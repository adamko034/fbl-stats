import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamExtractor } from './matchday-tips-top-team-extractor';

export class MatchdayTipsTopTeamExtractorOverall extends MatchdayTipsTopTeamExtractor {
  public extractGamesPlayed(player: Player): Game[] {
    return player.games;
  }
}
