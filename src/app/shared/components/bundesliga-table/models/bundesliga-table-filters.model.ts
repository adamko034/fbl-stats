import { BundesligaTableFilterType } from './bundesliga-table-filter-type.enum';

export interface BundesligaTableFilters {
  selectedType: BundesligaTableFilterType;
  types: BundesligaTableFilterType[];
}
