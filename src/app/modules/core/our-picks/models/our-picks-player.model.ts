import { PlayerAttendancePrediction } from '../../players/models/player-attendance-prediction.enum';
import { OurPicksPlayerFantasy } from './our-picks-player-fantasy.model';
import { OurPicksPlayerTeam } from './our-picks-player-team.model';

export interface OurPicksPlayer {
  order: number;
  playerId: number;
  name: string;
  lastName: string;
  position: string;
  isBargain: boolean;
  isDifferential: boolean;
  isMustHave: boolean;
  isPremium: boolean;
  top100Popularity: number;
  team: OurPicksPlayerTeam;
  fantasy: OurPicksPlayerFantasy;
  prediction: PlayerAttendancePrediction;
}
