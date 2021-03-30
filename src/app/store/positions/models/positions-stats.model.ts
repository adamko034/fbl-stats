import { PositionStats } from './position-stats.model';

export interface PositionsStats {
  goalkeepers: PositionStats;
  defenders: PositionStats;
  midfielders: PositionStats;
  forwards: PositionStats;
}
