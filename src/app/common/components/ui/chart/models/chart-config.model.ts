import { ChartData } from './chart-data.model';
import { ChartDialogConfig } from './chart-dialog-config.model';

export interface ChartConfig {
  data: ChartData[];
  xAxisLabel?: string;
  xAxisLabelShort?: string;
  yAxisLabel?: string;
  yAxisLabelShort?: string;
  title: string;
  showDialog?: boolean;
  dialogConfig?: ChartDialogConfig;
  showLabels?: boolean;
  autoScale?: boolean;
  yAxisTicks?: any[];
  roundDomains?: boolean;
  yScaleMin?: number;
  yScaleMax?: number;
  showLegend?: boolean;
  colors?: string[];
  animations?: boolean;
  legendPosition?: 'below' | 'right';
  width?: number;
  height?: number;
}
