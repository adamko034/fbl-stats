export interface Game {
  matchday: number;
  points?: number;
  teamShort: string;
  opponentRank: number;
  hasPlayed: boolean;
  hasPlayedMoreThan70Min: boolean;
  started: boolean;
  goals: number;
  assists: number;
  isHome: boolean;
}
