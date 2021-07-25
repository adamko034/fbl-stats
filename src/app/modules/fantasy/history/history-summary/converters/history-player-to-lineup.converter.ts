import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { LineupPlayer } from 'src/app/shared/components/team-lineup/models/lineup-player.model';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';

export class HistoryPlayerToLineupConverter implements Convertable<HistoryPlayer, LineupPlayer> {
  public convert(items: HistoryPlayer[]): LineupPlayer[] {
    return items.map((player) => ({
      name: player.name,
      team: player.team,
      lastName: player.lastName,
      position: player.position,
      subPosition: player.subPosition
    }));
  }
}
