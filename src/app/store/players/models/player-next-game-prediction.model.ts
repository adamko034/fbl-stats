import { PlayerAttendancePrediction } from 'src/app/layout/content/components/players-table-container/models/player-attendance-prediction.enum';

export interface PlayerNextGamePrediction {
  source: string;
  attendance: PlayerAttendancePrediction;
}
