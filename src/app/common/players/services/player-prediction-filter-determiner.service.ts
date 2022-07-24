import { Injectable } from '@angular/core';
import { PlayerPredictionCombined } from '../models/player-prediction-combined.enum';
import { PlayersFilterPrediciton } from '../models/players-filter-prediction.enum';

@Injectable()
export class PlayerPredictionFilterDeterminer {
  public includedInFilter(predictionCombined: PlayerPredictionCombined, filter: PlayersFilterPrediciton): boolean {
    if (filter === PlayersFilterPrediciton.ALL) {
      return true;
    }

    if (filter === PlayersFilterPrediciton.BENCHED) {
      return predictionCombined === PlayerPredictionCombined.BENCH;
    }

    if (filter === PlayersFilterPrediciton.VARIED) {
      return this.isDoubt(predictionCombined);
    }

    if (filter === PlayersFilterPrediciton.VARIED_AND_PLAY) {
      return this.isDoubt(predictionCombined) || this.willPlay(predictionCombined);
    }

    if (filter === PlayersFilterPrediciton.PLAY) {
      return this.willPlay(predictionCombined);
    }

    return false;
  }

  private willPlay(predictionCombined: PlayerPredictionCombined) {
    return (
      predictionCombined === PlayerPredictionCombined.START ||
      predictionCombined === PlayerPredictionCombined.GAME_POSTPONED
    );
  }

  private isDoubt(predictionCombined: PlayerPredictionCombined) {
    return predictionCombined === PlayerPredictionCombined.DOUBT;
  }
}
