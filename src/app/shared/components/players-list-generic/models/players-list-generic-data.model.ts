import { PlayersListGenericColumn } from './players-list-generic-column.model';
import { PlayersListGenericRow } from './players-list-generic-row.model';

export interface PlayersListGenericData {
  columns: PlayersListGenericColumn[];
  rows: PlayersListGenericRow[];
}
