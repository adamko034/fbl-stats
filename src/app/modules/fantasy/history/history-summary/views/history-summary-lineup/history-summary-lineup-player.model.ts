import { Position } from 'src/app/common/players/models/position.enum';

export interface HistorySummaryLineupPlayer {
  name: string;
  lastName: string;
  teamShort: string;
  position: Position;
  subPosition: number;
  price: number;
  popularity: number;
  points: number;
}
