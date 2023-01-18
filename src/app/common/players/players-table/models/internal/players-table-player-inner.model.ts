import { Position } from '../../../models/position.enum';
import { PlayersTablePlayerInnerNextGame } from './players-table-player-inner-next-game.model';

export interface PlayersTablePlayerInner {
  id?: string;
  name: string;
  lastName: string;
  position: Position;
  available?: boolean;
  returning?: boolean;
  suspensionRisk?: boolean;
  price: number;
  priceOriginal: number;
  popularity: number;
  teamShort: string;
  totalPoints: number;
  totalAvgPoints: number;
  top100Popularity: number;
  top500Popularity: number;
  totalGamesStarted: number;
  totalGames70Min: number;
  nextGame?: PlayersTablePlayerInnerNextGame;
  formPoints: number;
  formAvgPoints: number;
  formGamesStarted: number;
  formGames70Min: number;
  [matchday: number]: number;
}
