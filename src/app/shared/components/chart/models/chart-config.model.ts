import { ChartData } from './chart-data.model';

export interface ChartConfig {
  data: ChartData[];
  xAxisLabel: string;
  yAxisLabel: string;
  showLabels?: boolean;
  autoScale?: boolean;
  yAxisTicks?: any[];
  roundDomains?: boolean;
  yScaleMin?: number;
  yScaleMax?: number;
}
