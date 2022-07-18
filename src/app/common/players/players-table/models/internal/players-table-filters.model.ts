import { FromTo } from 'src/app/shared/models/from-to.model';
import { PlayersFilterPrediciton } from '../../../models/players-filter-prediction.enum';
import { Position } from '../../../models/position.enum';

export interface PlayersTableFilters {
  position: Position;
  matchdays: FromTo;
  maxPrice: number;
  maxPopularity: number;
  hideUnavailable: boolean;
  prediction: PlayersFilterPrediciton;
  teams: string[];
  playerName: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}
