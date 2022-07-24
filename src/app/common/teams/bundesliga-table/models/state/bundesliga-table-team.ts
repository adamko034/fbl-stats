import { BundesligaTableTeamGame } from './bundesliga-table-team-game.model';

export interface BundesligaTableTeam {
  name: string;
  shortName: string;
  rank: number;
  previousRank?: number;
  games: BundesligaTableTeamGame[];
}
