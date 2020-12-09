import { PlayerAttendancePrediction } from 'src/app/layout/content/components/players-table-container/models/player-attendance-prediction.enum';
import { Game } from 'src/app/models/game.model';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';

export interface PlayerUi {
  id: string;
  name: string;
  team: string;
  teamShort: string;
  price: number;
  position: string;
  popularity: number;
  totalPoints: number;
  attendance: number;
  form: number;
  games: Game[];
  nextGameAttendancePrediction: PlayerAttendancePrediction;
  nextGame: PlayerNextGame;
}
