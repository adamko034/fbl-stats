import { TeamTableStats } from 'src/app/modules/core/teams/models/team-table-stats.model';

export interface PlayerDetailsTeam {
  shortName: string;
  longName: string;
  table: TeamTableStats;
  last5: TeamTableStats;
  last5Form: string;
}
