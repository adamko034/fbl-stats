import { Team } from 'src/app/store/teams/models/team.model';

export interface BundesligaTableTeam extends Team {
  gspg: number;
  gcpg: number;
}
