import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';
import { Game } from 'src/app/store/players/models/game.model';
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
  avgPoints: number;
  attendance: number;
  form: number;
  leadersPopularity: number;
  games: Game[];
  isSuspensionRisk: boolean;
  isReturning: boolean;
  nextGameAttendancePrediction: PlayerAttendancePrediction;
  nextGame: PlayerNextGame;
}
