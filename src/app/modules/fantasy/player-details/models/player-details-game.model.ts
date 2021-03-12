export interface PlayerDetailsGame {
  matchday: number;
  date?: number;
  wasPlayed: boolean;
  points?: number;
  opponent: string;
  opponentRank: number;
  isHome: boolean;
  result?: number;
  resultText?: string;
  isFirstGame: boolean;
}
