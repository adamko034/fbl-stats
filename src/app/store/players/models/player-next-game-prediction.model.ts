import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';

export interface PlayerNextGamePrediction {
  source: string;
  attendance: PlayerAttendancePrediction;
}
