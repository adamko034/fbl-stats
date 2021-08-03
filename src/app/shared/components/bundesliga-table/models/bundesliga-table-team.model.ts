export interface BundesligaTableTeam {
  teamShort: string;
  teamLong: string;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  last5?: string;
}
