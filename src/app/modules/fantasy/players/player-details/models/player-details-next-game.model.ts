import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';
import { PlayerNextGamePrediction } from 'src/app/store/players/models/player-next-game-prediction.model';
import { PlayerDetailsTeam } from './player-details-team.model';

export interface PlayerDetailsNextGame {
  isHome: boolean;
  date: number;
  isFirstGame: boolean;
  opponent: PlayerDetailsTeam;
  matchday: number;
  isUnavailable: boolean;
  isSuspensionRisk: boolean;
  isPostponed: boolean;
  prediction: PlayerPredictionCombined;
  lineupPredictions: PlayerNextGamePrediction[];
}
