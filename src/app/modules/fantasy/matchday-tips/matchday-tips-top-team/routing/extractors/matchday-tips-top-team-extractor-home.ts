import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamExtractor } from './matchday-tips-top-team-extractor';

export class MatchdayTipsTopTeamExtractorHome extends MatchdayTipsTopTeamExtractor {
  public extractGamesPlayed(player: Player): Game[] {
    return new ArrayStream<Game>(player.games).filterQuick((g) => g.isHome).collect();
  }
}
