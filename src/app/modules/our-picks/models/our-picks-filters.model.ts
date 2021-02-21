import { PlayerPosition } from '../../players/views/players-fantasy/models/players-filters';
import { OurPicksType } from './our-picks-type.enum';

export interface OurPicksFilters {
  position?: PlayerPosition;
  types?: OurPicksType[];
}
