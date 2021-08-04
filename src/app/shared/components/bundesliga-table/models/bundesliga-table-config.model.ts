import { BundesligaTableFilterType } from './bundesliga-table-filter-type.enum';

export interface BundesligaTableConfig {
  showFilters?: boolean;
  showTypes?: boolean;
  types?: BundesligaTableFilterType[];
  showIncludedGames?: boolean;
  showTeamForm?: boolean;
}
