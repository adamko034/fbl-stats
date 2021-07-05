export interface TimelineMatchdayItem {
  matchday: number;
  opponent: string;
  date: number;
  isHome: boolean;
  wasPlayed: boolean;
  hasPlayed: boolean;
  points?: number;
  result?: string;
  resultText?: string;
  opponentRank: number;
  isFirstGame: boolean;
}
