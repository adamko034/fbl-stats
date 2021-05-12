import { Team } from 'src/app/store/teams/models/team.model';

export interface TableTeam extends Team {
  gspg: number;
  gcpg: number;
}
