import { Position } from 'src/app/common/players/models/position.enum';
import { HistoryPlayerGame } from './history-player-game.model';

export interface HistoryPlayer {
  name: string;
  lastName: string;
  position: Position;
  subPosition: number;
  teamShort: string;
  price: number;
  popularity: number;
  top100Popularity: number;
  top500Popularity: number;
  totalPoints: number;
  avgPoints: number;
  gamesStarted: number;
  games70Min: number;
  games: HistoryPlayerGame[];
}
