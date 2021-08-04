import { BundesligaTableFilterType } from './bundesliga-table-filter-type.enum';

export interface BundesligaTableFilters {
  type?: BundesligaTableFilterType;
  includedGames?: number;
}
