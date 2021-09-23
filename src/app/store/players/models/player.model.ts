import { Game } from 'src/app/store/players/models/game.model';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';
import { PlayerFantasyHistory } from './player-fantasy-history.model';
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
  popularity: number;
  price: number;
  last5: number;
  games: Game[];
  attendance: number;
  gamesStartedPercentage: number;
  nextGame: PlayerNextGame;
  isSuspensionRisk: boolean;
  isReturning: boolean;
  top100Popularity: number;
  scoringChances: PlayerScoringChances;
  fantasyHistory: PlayerFantasyHistory;
}
