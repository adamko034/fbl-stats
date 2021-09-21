import { PlayerPointsStat } from './player-points-stat.model';

export interface PlayerPointsStats {
  overall: PlayerPointsStat;
  last5: PlayerPointsStat;
}
