import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamExtractor } from './matchday-tips-top-team-extractor';

export class MatchdayTipsTopTeamExtractorFirstLeg extends MatchdayTipsTopTeamExtractor {
  public extractGamesPlayed(player: Player): Game[] {
    const firstLegGames = player.games.filter((g) => g.matchday <= 17);
    return new ArrayStream<Game>(firstLegGames).collect();
  }
}
