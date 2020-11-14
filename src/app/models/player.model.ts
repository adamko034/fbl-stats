import { Game } from 'src/app/models/game.model';

export interface Player {
  id: string;
  name: string;
  team: string;
  teamShort: string;
  totalPoints: number;
  popularity: number;
  price: number;
  games: Game[];
  attendance: number;
}
