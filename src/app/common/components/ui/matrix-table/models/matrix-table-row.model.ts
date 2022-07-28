import { MatrixTableColumn } from './matrix-table-column.model';

export interface MatrixTableRow {
  id: string;
  text: string;
  order: number;
  columns: MatrixTableColumn[];
}
