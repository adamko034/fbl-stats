import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersStatsAvgPointsType } from './players-stats-avg-points-type.enum';

export interface PlayersStatsAvgPointsFilters {
  position: PlayerPosition;
  includeGames: number;
  type: PlayersStatsAvgPointsType;
}
