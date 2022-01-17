export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: number;
  opponent: string;
  opponentLong: string;
  opponentRank: number;
  wasPlayed: boolean;
  wasPostponed: boolean;
  isMatchdayFirstGame: boolean;
  isStandaloneFixture: boolean;
  result?: number;
  resultText?: string;
  goalsScored?: number;
  goalsConceded?: number;
}
