import { PlayerPredictionCombined } from '../../../models/player-prediction-combined.enum';

export class PlayersTableCardPlayer {
  name: string;
  id: string;
  position: string;
  isAvailable: boolean;
  isReturning: boolean;
  isSuspensionRisk: boolean;
  price: number;
  popularity: number;
  top100Popularity: number;
  top500Popularity: number;
  teamShort: string;
  avgPoints: number;
  totalPoints: number;
  prediction: PlayerPredictionCombined;
  gamesPlayed?: number;
  specialValue?: number;
  [key: string]: string | number | boolean;
}
