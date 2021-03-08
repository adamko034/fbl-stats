import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';

export interface MatchdayFirstGames {
  matchday: number;
  date: number;
  fixtures: MatchdayFixture[];
  wasPlayed: boolean;
}
