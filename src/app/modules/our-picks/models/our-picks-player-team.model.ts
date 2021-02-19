import { OurPicksTeamGame } from './our-picks-team-game.model';

export interface OurPicksPlayerTeam {
  teamShort: string;
  rank: number;
  nextGames: OurPicksTeamGame[];
}
