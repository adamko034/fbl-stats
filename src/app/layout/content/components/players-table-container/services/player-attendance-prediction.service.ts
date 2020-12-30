import { Injectable } from '@angular/core';
import { PlayerAttendancePrediction } from 'src/app/layout/content/components/players-table-container/models/player-attendance-prediction.enum';
import { PlayerNextGamePrediction } from 'src/app/store/players/models/player-next-game-prediction.model';

@Injectable({ providedIn: 'root' })
export class PlayerAttendancePredictionService {
  public determine(predictions: PlayerNextGamePrediction[]): PlayerAttendancePrediction {
    if (this.allNotPublished(predictions)) {
      return PlayerAttendancePrediction.UnknownYet;
    }

    if (this.allWillPlay(predictions)) {
      return PlayerAttendancePrediction.WillPlay;
    }

    if (
      this.allWontPlay(predictions) ||
      this.predictionsNotSet(predictions) ||
      this.atLeastOneWontPlayOthersUnkown(predictions)
    ) {
      return PlayerAttendancePrediction.WillNotPlay;
    }

    if (this.atLeastOnePlayAndOtherWont(predictions)) {
      return PlayerAttendancePrediction.Doubt;
    }

    if (this.atLeastOnePlayOthersUnknown(predictions)) {
      return PlayerAttendancePrediction.WillPlayWithWarn;
    }

    return PlayerAttendancePrediction.Doubt;
  }

  private allNotPublished(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.every((p) => p.attendance === -1);
  }

  private allWillPlay(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.every((p) => p.attendance === 1);
  }

  private allWontPlay(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.every((p) => p.attendance === 0);
  }

  private atLeastOnePlayAndOtherWont(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.some((p) => p.attendance === 1) && predictions.every((p) => p.attendance !== -1);
  }

  private predictionsNotSet(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.length === 0;
  }

  private atLeastOneWontPlayOthersUnkown(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.some((p) => p.attendance === 0) && predictions.every((p) => p.attendance !== 1);
  }

  private atLeastOnePlayOthersUnknown(predictions: PlayerNextGamePrediction[]): boolean {
    return predictions.some((p) => p.attendance === 1) && predictions.every((p) => p.attendance !== 0);
  }
}
