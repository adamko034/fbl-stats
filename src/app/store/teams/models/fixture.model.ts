export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: Date;
  opponent: string;
  opponentLong: string;
  opponentRank: number;
  wasPlayed: boolean;
  isMatchdayFirstGame: boolean;
  result?: number;
  resultText?: string;
}
