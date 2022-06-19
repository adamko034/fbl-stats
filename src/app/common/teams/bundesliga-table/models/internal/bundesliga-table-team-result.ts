export interface BundesligaTableTeamResult {
  name: string;
  shortName: string;
  rank: number;
  previousRank: number;
  points: number;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  goalsDiff: number;
  gspg: number;
  gcpg: number;
  cleanSheets: number;
  cleanSheetsPercentage: number;
  failedToScore: number;
  failedToScorePercentage: number;
  form: string;
}
