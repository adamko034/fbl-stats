import { PlayersStatsPointsType } from './players-stats-points-type.enum';

export interface PlayersStatsPointsFilters {
  type: PlayersStatsPointsType;
  calculations: 'overall' | 'last5';
}
