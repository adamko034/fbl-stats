import { PlayerPosition } from '../../../modules/fantasy/players/overall/models/players-filters';

export interface HistoryPlayer {
  name: string;
  lastName: string;
  team: string;
  position: PlayerPosition;
  subPosition: number;
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
