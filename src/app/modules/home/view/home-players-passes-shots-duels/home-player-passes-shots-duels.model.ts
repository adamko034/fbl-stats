import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';

export interface HomePlayerPassesShotsDuels {
  id: string;
  name: string;
  teamShort: string;
  isUnavailable: boolean;
  isReturning: boolean;
  price: number;
  top500Popularity: number;
  totalPoints: number;
  position: string;
  prediction: PlayerPredictionCombined;
  shots: number;
  passes: number;
  duels: number;
  shotsSaved: number;
}
