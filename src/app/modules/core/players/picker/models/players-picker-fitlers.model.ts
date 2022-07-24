import { Position } from 'src/app/common/players/models/position.enum';

export interface PlayersPickerFilters {
  excludedIds?: string[];
  position?: Position;
}
