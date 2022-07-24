import { PlayerPredictionCombined } from '../../../models/player-prediction-combined.enum';

export interface PlayersTablePlayerNextGame {
  prediction: PlayerPredictionCombined;
  teamShort: string;
  isHome: boolean;
}
