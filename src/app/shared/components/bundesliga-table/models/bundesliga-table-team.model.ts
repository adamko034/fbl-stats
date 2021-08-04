export interface BundesligaTableTeam {
  teamShort: string;
  teamLong: string;
  rank: number;
  gamesPlayed: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  gspg: number;
  gcpg: number;
  goalsDiff: number;
  failedToScore: number;
  last5?: string;
}
