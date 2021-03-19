import { Game } from 'src/app/models/game.model';

export interface PlayerDetailsFantasy {
  price: number;
  popularity: number;
  totalPoints: number;
  last5: number;
  lastMD: number;
  top100Popularity: number;
  seasonAvg: number;
  last5Avg: number;
  bestGame: Game;
  worstGame: Game;
  pointsPer1M: number;
}
