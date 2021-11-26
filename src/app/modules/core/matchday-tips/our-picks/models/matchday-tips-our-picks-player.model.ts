import { PlayerAttendancePrediction } from '../../../players/models/player-attendance-prediction.enum';
import { MatchdayTipsOurPicksPlayerMatchday } from './matchday-tips-our-picks-player-matchday.model';
import { MatchdayTipsOurPicksTeamGame } from './matchday-tips-our-picks-team-game.model';
import { MatchdayTipsOurPicksTeam } from './matchday-tips-our-picks-team.model';

export interface MatchdayTipsOurPicksPlayer {
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
  nextGame: MatchdayTipsOurPicksTeamGame;
  team: MatchdayTipsOurPicksTeam;
  matchdays: MatchdayTipsOurPicksPlayerMatchday[];
  prediction: PlayerAttendancePrediction;
  totalPoints: number;
}
