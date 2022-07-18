import { Position } from 'src/app/common/players/models/position.enum';
import { CalculationsType } from 'src/app/shared/models/calculations-type.enum';
import { PlayersStatsPointsSubType } from './players-stats-points-subtype.enum';
import { PlayersStatsPointsType } from './players-stats-points-type.enum';

export interface PlayersStatsPointsFilters {
  type: PlayersStatsPointsType;
  subType: PlayersStatsPointsSubType;
  calculations: CalculationsType;
  position: Position;
  selectedColumns?: string[];
}
