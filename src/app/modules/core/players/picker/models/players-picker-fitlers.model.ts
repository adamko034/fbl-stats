import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';

export interface PlayersPickerFilters {
  excludedIds?: string[];
  position?: PlayerPosition;
}
