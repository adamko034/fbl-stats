import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { TimelineMatchdayItem } from 'src/app/shared/components/timeline-matchdays/models/timeline-matchday-item.model';
import { PlayerDetailsGame } from '../models/player-details-game.model';

export class GameTimelineMatchdayConverter implements Convertable<PlayerDetailsGame, TimelineMatchdayItem> {
  public convert(items: PlayerDetailsGame[]): TimelineMatchdayItem[] {
    return items.map(
      ({ date, resultText, result, isHome, matchday, opponent, points, wasPlayed, opponentRank, isFirstGame }) => ({
        date,
        result: this.resultNumberToText(result),
        resultText,
        isHome,
        points,
        matchday,
        wasPlayed,
        opponent,
        opponentRank,
        isFirstGame
      })
    );
  }

  private resultNumberToText(result: number): string {
    if (result < 0) {
      return 'l';
    } else if (result === 0) {
      return 'd';
    } else {
      return 'w';
    }
  }
}
