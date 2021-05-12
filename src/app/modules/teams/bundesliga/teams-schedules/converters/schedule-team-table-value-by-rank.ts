import { ScheduleTeamTableValueDeterimer } from 'src/app/modules/teams/bundesliga/teams-schedules/converters/schedule-team-table-value-determiner';
import { TeamSchedule } from 'src/app/modules/teams/bundesliga/teams-schedules/models/team-schedule.model';

export class ScheduleTeamTableValueByRank implements ScheduleTeamTableValueDeterimer {
  public get(teamSchedule: TeamSchedule): number {
    return teamSchedule.rank;
  }
}
