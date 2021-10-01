import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersStatsPointsSubType } from './players-stats-points-subtype.enum';
import { PlayersStatsPointsType } from './players-stats-points-type.enum';

export interface PlayersStatsPointsFilters {
  type: PlayersStatsPointsType;
  subType: PlayersStatsPointsSubType;
  calculations: 'overall' | 'last5';
  position: PlayerPosition;
}
