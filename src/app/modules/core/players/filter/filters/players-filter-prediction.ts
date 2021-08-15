import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { PlayersPrediciton } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerAttendancePrediction } from '../../models/player-attendance-prediction.enum';
import { PlayerAttendancePredictionService } from '../../services/player-attendance-prediction.service';

export class PlayersFilterPrediction implements PlayersFilter {
  private determiner: PlayerAttendancePredictionService;

  constructor(private prediction?: PlayersPrediciton) {
    this.determiner = new PlayerAttendancePredictionService();
  }

  public filter(players: Player[]): Player[] {
    if (this.prediction == null || this.prediction == undefined) {
      return players;
    }

    let playerPredictions: PlayerAttendancePrediction[];

    switch (this.prediction) {
      case PlayersPrediciton.Benched:
        playerPredictions = [PlayerAttendancePrediction.WillNotPlay];
        break;
      case PlayersPrediciton.Varied:
        playerPredictions = [PlayerAttendancePrediction.Doubt];
        break;
      case PlayersPrediciton.VariedAndPlay:
        playerPredictions = [PlayerAttendancePrediction.Doubt, PlayerAttendancePrediction.WillPlay];
        break;
      default:
        playerPredictions = [PlayerAttendancePrediction.WillPlay];
        break;
    }

    return players.filter((p) => playerPredictions.includes(this.determiner.determine(p.nextGame?.lineupPredictions)));
  }
}
