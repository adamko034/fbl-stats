import { PlayerPosition } from '../../../players/overall/models/players-filters';

export interface HistoryPlayersFilters {
  position: PlayerPosition;
  maxPrice: number;
  teams: string[];
  maxPopularity: number;
}
