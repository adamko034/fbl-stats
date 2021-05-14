import { FixtureDifficulty } from '../models/fixture-difficulty.model';

export interface ScheduleTeamTableValueDeterimer {
  get(teamSchedule: FixtureDifficulty): number;
}
