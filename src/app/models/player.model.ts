import { Game } from 'src/app/models/game.model';

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
  nextGameIsHome: boolean;
  nextOpponent: string;
}
