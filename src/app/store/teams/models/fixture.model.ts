export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: number;
  opponent: string;
  opponentLong: string;
  opponentRank: number;
  wasPlayed: boolean;
  isMatchdayFirstGame: boolean;
  result?: number;
  resultText?: string;
  goalsScored?: number;
  goalsConceded?: number;
}
