import { Game } from 'src/app/store/players/models/game.model';

export interface PlayerDetailsGame extends Game {
  date?: number;
  wasPlayed: boolean;
  wasPostponed: boolean;
  opponent: string;
  opponentRank: number;
  isHome: boolean;
  result?: number;
  resultText?: string;
  isFirstGame: boolean;
  started: boolean;
  hasPlayed: boolean;
}
