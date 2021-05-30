import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';
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
  prediction: PlayerAttendancePrediction;
  lineupPredictions: PlayerNextGamePrediction[];
}
