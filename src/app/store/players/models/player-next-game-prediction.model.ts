import { PlayerSourceLineupPrediction } from 'src/app/common/players/models/player-source-lineup-prediction.enum';

export interface PlayerNextGamePrediction {
  source: string;
  attendance: PlayerSourceLineupPrediction;
}
