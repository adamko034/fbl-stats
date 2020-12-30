import { Injectable } from '@angular/core';
import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';
import { PlayerNextGamePrediction } from 'src/app/store/players/models/player-next-game-prediction.model';

@Injectable({ providedIn: 'root' })
export class PlayerAttendancePredictionService {
  public determine(predictions: PlayerNextGamePrediction[]): PlayerAttendancePrediction {
    if (predictions.every((p) => p.attendance === -1)) {
      return PlayerAttendancePrediction.UnknownYet;
    }

    // const availablePredictions = predictions.filter((p) => p.attendance !== -1);

    // const willPlay = availablePredictions.every((p) => p.attendance === 1);
    const willPlay = predictions.every((p) => p.attendance === 1);
    if (willPlay) {
      return PlayerAttendancePrediction.WillPlay;
    }

    // const wontPlay = availablePredictions.every((p) => p.attendance === 0);
    const wontPlay = predictions.every((p) => p.attendance === 0);
    if (wontPlay || predictions.length === 0) {
      return PlayerAttendancePrediction.WillNotPlay;
    }

    return PlayerAttendancePrediction.Doubt;
  }
}
