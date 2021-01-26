import { ScheduleTeamTableValueDeterimer } from 'src/app/modules/teams/views/teams-schedules/converters/schedule-team-table-value-determiner';
import { TeamSchedule } from 'src/app/modules/teams/views/teams-schedules/models/team-schedule.model';

export class ScheduleTeamTableValueByForm implements ScheduleTeamTableValueDeterimer {
  constructor(private includedGames: string) {}

  get(scheduleTeam: TeamSchedule): number {
    return scheduleTeam[`last${this.includedGames}Games`];
  }
}
