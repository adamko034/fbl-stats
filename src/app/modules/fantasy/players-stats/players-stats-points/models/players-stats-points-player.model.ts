import { TableCell } from 'src/app/shared/models/table-cell.model';

export interface PlayersStatsPointsPlayer {
  id: string;
  name: string;
  lastName: string;
  teamShort: string;
  position: string;
  price: number;
  totalPoints: number;
  stats: TableCell[];
}
