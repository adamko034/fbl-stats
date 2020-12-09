import { PlayerNextGamePrediction } from 'src/app/store/players/models/player-next-game-prediction.model';

export interface PlayerNextGame {
  isHome: boolean;
  opponent: string;
  lineupPredictions: PlayerNextGamePrediction[];
}
