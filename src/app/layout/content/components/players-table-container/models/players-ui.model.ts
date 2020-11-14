import { Game } from 'src/app/models/game.model';

export interface PlayerUi {
  id: string;
  name: string;
  team: string;
  teamShort: string;
  price: number;
  popularity: number;
  totalPoints: number;
  attendance: number;
  form: number;
  games: Game[];
}
