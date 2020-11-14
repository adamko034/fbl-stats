export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: Date;
  opponent: string;
  result?: number;
  resultText?: string;
}
