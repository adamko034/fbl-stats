export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: Date;
  opponent: string;
  opponentRank: number;
  wasPlayed: boolean;
  result?: number;
  resultText?: string;
}
