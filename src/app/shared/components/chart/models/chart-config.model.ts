import { ChartData } from './chart-data.model';

export interface ChartConfig {
  data: ChartData[];
  xAxisLabel: string;
  xAxisLabelShort?: string;
  yAxisLabel: string;
  yAxisLabelShort?: string;
  title: string;
  showDialog?: boolean;
  showLabels?: boolean;
  autoScale?: boolean;
  yAxisTicks?: any[];
  roundDomains?: boolean;
  yScaleMin?: number;
  yScaleMax?: number;
  showLegend?: boolean;
  legendPosition?: 'below' | 'right';
  width?: number;
  height?: number;
}
