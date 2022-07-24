import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';
import { PlayersFilterPrediciton } from 'src/app/common/players/models/players-filter-prediction.enum';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterPrediction implements PlayersFilter {
  private determiner: PlayerPredictionCombinedDeterminer;

  constructor(private prediction?: PlayersFilterPrediciton) {
    this.determiner = new PlayerPredictionCombinedDeterminer();
  }

  public filter(players: Player[]): Player[] {
    if (this.prediction == null || this.prediction == undefined) {
      return players;
    }

    let playerPredictions: PlayerPredictionCombined[];

    switch (this.prediction) {
      case PlayersFilterPrediciton.BENCHED:
        playerPredictions = [PlayerPredictionCombined.BENCH];
        break;
      case PlayersFilterPrediciton.VARIED:
        playerPredictions = [PlayerPredictionCombined.DOUBT];
        break;
      case PlayersFilterPrediciton.VARIED_AND_PLAY:
        playerPredictions = [PlayerPredictionCombined.DOUBT, PlayerPredictionCombined.START];
        break;
      default:
        playerPredictions = [PlayerPredictionCombined.START];
        break;
    }

    return players.filter((p) => {
      const predictionCombined = this.determiner.determine(p.nextGame);
      return playerPredictions.includes(predictionCombined);
    });
  }
}
