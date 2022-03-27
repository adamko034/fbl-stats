export interface Fixture {
  matchday: number;
  isHome: boolean;
  date: number;
  opponent: string;
  opponentLong: string;
  opponentRank: number;
  wasPlayed: boolean;
  wasPostponed: boolean;
  matchdayPlayed: boolean;
  isMatchdayFirstGame: boolean;
  isStandaloneFixture: boolean;
  points?: number;
  result?: number;
  resultText?: string;
  goalsScored?: number;
  goalsConceded?: number;
}
