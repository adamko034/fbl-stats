import { Game } from 'src/app/models/game.model';

export interface PlayerDetailsGame extends Game {
  date?: number;
  wasPlayed: boolean;
  wasPostponed: boolean;
  opponent: string;
  opponentRank: number;
  isHome: boolean;
  playerWasAvailable: boolean;
  result?: number;
  resultText?: string;
  isFirstGame: boolean;
}
