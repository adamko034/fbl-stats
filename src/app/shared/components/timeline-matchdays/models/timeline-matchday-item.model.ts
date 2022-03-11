export interface TimelineMatchdayItem {
  matchday: number;
  opponent: string;
  date: number;
  isHome: boolean;
  wasPlayed: boolean;
  matchdayPlayed: boolean;
  postponed: boolean;
  hasPlayed: boolean;
  hasStarted?: boolean;
  hasPlayed70min?: boolean;
  goalsScored?: number;
  assists?: number;
  points?: number;
  result?: string;
  resultText?: string;
  opponentRank: number;
  isFirstGame: boolean;
}
