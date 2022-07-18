import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { LineupPlayer } from 'src/app/shared/components/team-lineup/models/lineup-player.model';
import { HistorySummaryLineupPlayer } from '../views/history-summary-lineup/history-summary-lineup-player.model';

export class HistoryPlayerToLineupConverter implements Convertable<HistorySummaryLineupPlayer, LineupPlayer> {
  public convert(items: HistorySummaryLineupPlayer[]): LineupPlayer[] {
    return items.map((player) => ({
      name: player.name,
      team: player.teamShort,
      lastName: player.lastName,
      position: player.position,
      subPosition: player.subPosition
    }));
  }
}
