import { FixturesGame } from './fixture-game.model';

export interface MatchdayFixtures {
  matchdayNumber: number;
  firstGameDate: number;
  dates: number[];
  wasPlayed: boolean;
  isConfirmed: boolean;
  gamesPerDate: { [date: number]: FixturesGame[] };
}
