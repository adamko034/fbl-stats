import { Game } from 'src/app/store/players/models/game.model';
import { PlayerDetailsFantasyHistory } from './player-details-fantasy-history.model';

export interface PlayerDetailsFantasy {
  price: number;
  popularity: number;
  totalPoints: number;
  last5: number;
  lastMD: number;
  top100Popularity: number;
  top500Popularity: number;
  seasonAvg: number;
  last5Avg: number;
  bestGame: Game;
  worstGame: Game;
  pointsPer1M: number;
  history: PlayerDetailsFantasyHistory;
}
