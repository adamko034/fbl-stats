import { TeamSchedule } from 'src/app/modules/teams/bundesliga/teams-schedules/models/team-schedule.model';

export interface TeamsSchedulesState {
  teams: TeamSchedule[];
  mdsHeader: number[];
}
