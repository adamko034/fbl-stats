import { TeamSchedule } from 'src/app/modules/teams/views/teams-schedules/models/team-schedule.model';

export interface ScheduleTeamTableValueDeterimer {
  get(teamSchedule: TeamSchedule): number;
}
