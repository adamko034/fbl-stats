import { FixtureDifficulty } from '../models/fixture-difficulty.model';
import { ScheduleTeamTableValueDeterimer } from './fixtures-difficulty-table-value-determiner';

export class FixturesDifficultyTableValueByRank implements ScheduleTeamTableValueDeterimer {
  public get(teamSchedule: FixtureDifficulty): number {
    return teamSchedule.rank;
  }
}
