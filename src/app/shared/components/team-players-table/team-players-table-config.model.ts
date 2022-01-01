import { TeamPlayersTableColumn } from './team-players-table-column.model';

export interface TeamPlayersTableConfig {
  title: string;
  showTeamLogo: boolean;
  columns: TeamPlayersTableColumn[];
}
