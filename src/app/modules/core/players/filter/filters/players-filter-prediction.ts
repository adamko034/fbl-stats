import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerAttendancePrediction } from '../../models/player-attendance-prediction.enum';
import { PlayerAttendancePredictionService } from '../../services/player-attendance-prediction.service';

export class PlayersFilterPrediction implements PlayersFilter {
  private determiner: PlayerAttendancePredictionService;

  constructor(private prediction: PlayerAttendancePrediction) {
    this.determiner = new PlayerAttendancePredictionService();
  }

  public filter(players: Player[]): Player[] {
    return players.filter((p) => this.determiner.determine(p.nextGame?.lineupPredictions) === this.prediction);
  }
}
