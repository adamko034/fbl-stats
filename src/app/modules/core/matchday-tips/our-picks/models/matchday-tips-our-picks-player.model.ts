import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';
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
  top500Popularity: number;
  popularity: number;
  price: number;
  formPts: number;
  nextGame: MatchdayTipsOurPicksTeamGame;
  team: MatchdayTipsOurPicksTeam;
  matchdays: MatchdayTipsOurPicksPlayerMatchday[];
  prediction: PlayerPredictionCombined;
  totalPoints: number;
  isAvailable: boolean;
  isReturning: boolean;
  isSuspensionRisk: boolean;
}
