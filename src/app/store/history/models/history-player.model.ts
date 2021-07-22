import { PlayerPosition } from '../../../modules/fantasy/players/overall/models/players-filters';

export interface HistoryPlayer {
  name: string;
  team: string;
  position: PlayerPosition;
  totalPoints: number;
  price: number;
  popularity: number;
  leadersPopularity: number;
  avg: number;
  firstLegPoints: number;
  secondLegPoints: number;
  homeGamesPoints: number;
  homeAvg: number;
  awayGamesPoints: number;
  awayAvg: number;
  tenPointsEfficiency: number;
  fifteenPointsEfficiency: number;
}
