import { Venue } from 'src/app/shared/models/venue.enum';

export interface BundesligaTableFilters {
  venue: Venue;
  matchdays: number;
}
