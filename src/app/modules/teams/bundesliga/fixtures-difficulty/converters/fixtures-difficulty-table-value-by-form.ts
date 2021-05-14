import { FixtureDifficulty } from '../models/fixture-difficulty.model';
import { ScheduleTeamTableValueDeterimer } from './fixtures-difficulty-table-value-determiner';

export class FixturesDifficultyTableValueByForm implements ScheduleTeamTableValueDeterimer {
  constructor(private includedGames: string) {}

  get(scheduleTeam: FixtureDifficulty): number {
    return scheduleTeam[`last${this.includedGames}Games`];
  }
}
