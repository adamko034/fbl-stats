import { Game } from 'src/app/models/game.model';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';

export interface Player {
  id: string;
  name: string;
  team: string;
  teamShort: string;
  totalPoints: number;
  position: string;
  popularity: number;
  price: number;
  games: Game[];
  attendance: number;
  nextGame: PlayerNextGame;
  isSuspensionRisk: boolean;
  isReturning: boolean;
}
