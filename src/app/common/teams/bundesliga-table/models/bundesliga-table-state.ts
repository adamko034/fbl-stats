import { BundesligaTableConfig } from './state/bundesliga-table-config';
import { BundesligaTableTeam } from './state/bundesliga-table-team';

export interface BundesligaTableState {
  config: BundesligaTableConfig;
  teams: BundesligaTableTeam[];
  selectedTeams: string[];
  lastMatchday: number;
  season?: string;
}
