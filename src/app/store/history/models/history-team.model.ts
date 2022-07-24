import { HistoryTeamGame } from './history-team-game.model';

export interface HistoryTeam {
  name: string;
  shortName: string;
  rank: number;
  games: HistoryTeamGame[];
}
