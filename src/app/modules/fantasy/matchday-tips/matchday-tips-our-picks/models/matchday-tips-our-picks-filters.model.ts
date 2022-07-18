import { Position } from 'src/app/common/players/models/position.enum';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';

export interface MatchdayTipsOurPicksFilters {
  position?: Position;
  types?: MatchdayTipsOurPicksType[];
}
