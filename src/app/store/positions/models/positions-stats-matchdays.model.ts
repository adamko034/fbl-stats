import { PositionStatsMatchday } from './position-stats-matchday.model';

export interface PositionsStatsMatchdays {
  positions: { [position: string]: PositionStatsMatchday[] };
}
