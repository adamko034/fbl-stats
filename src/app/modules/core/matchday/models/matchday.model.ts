import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';

export interface Matchday {
  num: number;
  wasPlayed: boolean;
  fixtures: { [number: string]: MatchdayFixture[] };
}
