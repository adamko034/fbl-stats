import { TeamSchedule } from 'src/app/modules/core/teams/schedules/models/team-schedule.model';

export interface TeamsSchedulesState {
  teams: TeamSchedule[];
  mdsHeader: number[];
}
