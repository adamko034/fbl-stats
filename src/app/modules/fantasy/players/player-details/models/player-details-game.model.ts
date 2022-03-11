import { Game } from 'src/app/store/players/models/game.model';

export interface PlayerDetailsGame extends Game {
  date?: number;
  wasPlayed: boolean;
  wasPostponed: boolean;
  matchdayPlayed: boolean;
  opponent: string;
  opponentRank: number;
  isHome: boolean;
  resultText?: string;
  isFirstGame: boolean;
  started: boolean;
  goals: number;
  assists: number;
}
