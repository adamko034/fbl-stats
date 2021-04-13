import { ChartPoint } from './chart-point.model';

export interface ChartData {
  name: string;
  tableColumnName?: string;
  series: ChartPoint[];
}
