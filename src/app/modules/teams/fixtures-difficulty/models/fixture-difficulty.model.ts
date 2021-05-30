import { FixtureDifficultyGame } from './fixture-difficulty-game.model';

export interface FixtureDifficulty {
  shortName: string;
  longName: string;
  rank: number;
  games: { [key: string]: FixtureDifficultyGame };
  next2GamesIndex: number;
  next3GamesIndex: number;
  next5GamesIndex: number;
  last2Games: number;
  last3Games: number;
  last4Games: number;
  last5Games: number;
  index: number;
}
