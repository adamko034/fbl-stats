import { Game } from 'src/app/models/game.model';

export interface Player {
  name: string;
  team: string;
  totalPoints: number;
  popularity: number;
  price: number;
  games: Game[];
}
