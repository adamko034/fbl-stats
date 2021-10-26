import { PositionsStatsMatchdays } from './positions-stats-matchdays.model';

export interface PositionsStats {
  overall: PositionsStatsMatchdays;
  overallTop20: PositionsStatsMatchdays;
  top10EachPosition: PositionsStatsMatchdays;
}
