import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';

export interface HomePlayersGamesStartedPlayer {
  id: string;
  name: string;
  teamShort: string;
  isUnavailable: boolean;
  isReturning: boolean;
  price: number;
  totalPoints: number;
  position: string;
  prediction: PlayerPredictionCombined;
  gamesStartedPercentage: number;
  games70MinutesPercentage: number;
}
