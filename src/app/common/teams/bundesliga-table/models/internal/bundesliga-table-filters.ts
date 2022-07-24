import { FromTo } from 'src/app/shared/models/from-to.model';
import { Venue } from 'src/app/shared/models/venue.enum';

export interface BundesligaTableFilters {
  venue: Venue;
  matchdays: FromTo;
}
