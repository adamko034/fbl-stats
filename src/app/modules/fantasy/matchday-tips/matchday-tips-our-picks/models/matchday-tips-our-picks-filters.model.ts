import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { PlayerPosition } from '../../../players/overall/models/players-filters';

export interface MatchdayTipsOurPicksFilters {
  position?: PlayerPosition;
  types?: MatchdayTipsOurPicksType[];
}
