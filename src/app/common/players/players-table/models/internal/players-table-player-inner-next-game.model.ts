import { PlayerPredictionCombined } from '../../../models/player-prediction-combined.enum';

export interface PlayersTablePlayerInnerNextGame {
  teamShort: string;
  isHome: boolean;
  prediction: PlayerPredictionCombined;
}
