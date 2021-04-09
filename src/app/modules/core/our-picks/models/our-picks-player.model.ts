import { PlayerAttendancePrediction } from '../../players/models/player-attendance-prediction.enum';
import { OurPicksPlayerFantasyMatchday } from './our-picks-player-fantasy-matchday.model';
import { OurPicksPlayerTeam } from './our-picks-player-team.model';
import { OurPicksTeamGame } from './our-picks-team-game.model';

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
  isSurprising: boolean;
  top100Popularity: number;
  popularity: number;
  price: number;
  formPts: number;
  nextGame: OurPicksTeamGame;
  team: OurPicksPlayerTeam;
  matchdays: OurPicksPlayerFantasyMatchday[];
  prediction: PlayerAttendancePrediction;
  totalPoints: number;
}
