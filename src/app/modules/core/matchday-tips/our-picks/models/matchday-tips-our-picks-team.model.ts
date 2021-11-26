import { MatchdayTipsOurPicksTeamGame } from './matchday-tips-our-picks-team-game.model';

export interface MatchdayTipsOurPicksTeam {
  teamShort: string;
  rank: number;
  nextGames: MatchdayTipsOurPicksTeamGame[];
}
