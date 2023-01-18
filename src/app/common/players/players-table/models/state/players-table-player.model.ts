import { Position } from '../../../models/position.enum';
import { PlayersTablePlayerGame } from './players-table-player-game.model';
import { PlayersTablePlayerNextGame } from './players-table-player-next-game.model';

export interface PlayersTablePlayer {
  id?: string;
  name: string;
  lastName: string;
  position: Position;
  available?: boolean;
  price: number;
  priceOriginal: number;
  popularity: number;
  teamShort: string;
  top100Popularity: number;
  top500Popularity: number;
  totalPoints: number;
  avgPoints: number;
  returning?: boolean;
  suspensionRisk?: boolean;
  gamesStarted: number;
  games70Min: number;
  games: PlayersTablePlayerGame[];
  nextGame?: PlayersTablePlayerNextGame;
}
