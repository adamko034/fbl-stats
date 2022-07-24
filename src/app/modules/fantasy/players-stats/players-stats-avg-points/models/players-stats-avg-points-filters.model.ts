import { Position } from 'src/app/common/players/models/position.enum';
import { PlayersStatsAvgPointsType } from './players-stats-avg-points-type.enum';

export interface PlayersStatsAvgPointsFilters {
  position: Position;
  includeGames: number;
  type: PlayersStatsAvgPointsType;
}
