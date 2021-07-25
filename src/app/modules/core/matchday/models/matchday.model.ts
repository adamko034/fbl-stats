import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';

export interface Matchday {
  matchdayNumber: number;
  wasPlayed: boolean;
  fixtures: { [date: string]: MatchdayFixture[] };
}
