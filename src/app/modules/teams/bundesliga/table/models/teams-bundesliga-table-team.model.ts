export interface TeamsBundesligaTableTeam {
  shortName: string;
  name: string;
  rank: number;
  rankFiltered: number;
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
