import { TeamSchedule } from 'src/app/modules/teams/views/teams-schedules/models/team-schedule.model';

export interface TeamsSchedulesState {
  teams: TeamSchedule[];
  mdsHeader: number[];
}
