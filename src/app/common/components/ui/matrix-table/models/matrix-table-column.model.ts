import { MatrixTableColor } from './matrix-table-color.enum';

export interface MatrixTableColumn {
  id: string;
  text: string;
  order: number;
  color?: MatrixTableColor;
}
