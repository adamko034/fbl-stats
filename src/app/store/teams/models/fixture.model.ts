export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: Date;
  opponent: string;
  opponentRank: number;
  result?: number;
  resultText?: string;
}
