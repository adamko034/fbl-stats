import { Position } from 'src/app/common/players/models/position.enum';

export interface PlayersCompareQuickLinkFilters {
  count?: number;
  maxPrice?: number;
  position?: Position;
}
