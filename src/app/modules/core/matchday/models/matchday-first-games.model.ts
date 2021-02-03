import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';

export interface MatchdayFirstGames {
  matchday: number;
  date: Date;
  fixtures: MatchdayFixture[];
  wasPlayed: boolean;
}
