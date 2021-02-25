import { OurPicksType } from '../../core/our-picks/models/our-picks-type.enum';
import { PlayerPosition } from '../../players/views/players-fantasy/models/players-filters';

export interface OurPicksFilters {
  position?: PlayerPosition;
  types?: OurPicksType[];
}
