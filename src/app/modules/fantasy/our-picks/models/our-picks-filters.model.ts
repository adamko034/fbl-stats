import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { PlayerPosition } from '../../players/models/players-filters';

export interface OurPicksFilters {
  position?: PlayerPosition;
  types?: OurPicksType[];
}
