import { Game } from 'src/app/store/players/models/game.model';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';
import { PlayerSubPosition } from './palyer-subposition.enum';
import { PlayerFantasyHistory } from './player-fantasy-history.model';
import { PlayerPointsStats } from './player-points-stats.model';
import { PlayerScoringChances } from './player-scoring-chances.model';

export interface Player {
  id: string;
  name: string;
  lastName: string;
  team: string;
  teamShort: string;
  totalPoints: number;
  avgPoints: number;
  position: string;
  subPosition: PlayerSubPosition;
  popularity: number;
  price: number;
  priceOriginal: number;
  last5: number;
  games: Game[];
  attendance: number;
  gamesStartedPercentage: number;
  games70MinPercentage: number;
  nextGame: PlayerNextGame;
  isSuspensionRisk: boolean;
  isReturning: boolean;
  top100Popularity: number;
  top500Popularity: number;
  scoringChances: PlayerScoringChances;
  fantasyHistory: PlayerFantasyHistory;
  pointsStats: PlayerPointsStats;
}
