import { Injectable } from '@angular/core';
import { PlayerNextGamePrediction } from 'src/app/store/players/models/player-next-game-prediction.model';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';
import { PlayerPredictionCombined } from '../models/player-prediction-combined.enum';

@Injectable()
export class PlayerPredictionCombinedDeterminer {
  public determine(playerNextGame: PlayerNextGame): PlayerPredictionCombined {
    if (playerNextGame?.isPostponed) {
      return PlayerPredictionCombined.GAME_POSTPONED;
    }

    const predictions = playerNextGame.lineupPredictions;
    if (this.allNotPublished(predictions)) {
      return PlayerPredictionCombined.UNKNOWN;
    }

    if (this.allWillPlay(predictions) || this.atLeastOnePlayOthersUnknown(predictions)) {
      return PlayerPredictionCombined.START;
    }

    if (
      this.allWontPlay(predictions) ||
      this.predictionsNotSet(predictions) ||
      this.atLeastOneWontPlayOthersUnkown(predictions)
    ) {
      return PlayerPredictionCombined.BENCH;
    }

    if (this.atLeastOnePlayAndOtherWont(predictions)) {
      return PlayerPredictionCombined.DOUBT;
    }

    return PlayerPredictionCombined.DOUBT;
  }

  private allNotPublished(predictions: PlayerNextGamePrediction[]): boolean {
    return !predictions || predictions.every((p) => p.attendance === -1);
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
