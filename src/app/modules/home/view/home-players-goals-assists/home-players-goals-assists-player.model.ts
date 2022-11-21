import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';

export interface HomePlayersGoalsAssistsPlayer {
  id: string;
  name: string;
  teamShort: string;
  isUnavailable: boolean;
  isReturning: boolean;
  price: number;
  top500Popularity: number;
  goals: number;
  assists: number;
  totalPoints: number;
  position: string;
  prediction: PlayerPredictionCombined;
}
