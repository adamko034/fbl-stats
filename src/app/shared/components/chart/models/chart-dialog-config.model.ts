import { ChartData } from './chart-data.model';

export interface ChartDialogConfig {
  data?: ChartData[];
  showLegend?: boolean;
  legendBlueAxisLabel?: string;
  legendRedAxisLabel?: string;
  columns?: string[];
  showDiff?: false;
}
