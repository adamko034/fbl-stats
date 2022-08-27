import { ChartPoint } from 'src/app/common/components/ui/chart/models/chart-point.model';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { PositionStatsMatchday } from 'src/app/store/positions/models/position-stats-matchday.model';

export class PositionStatsToChartPointConverter implements Convertable<PositionStatsMatchday, ChartPoint> {
  public convert(items: PositionStatsMatchday[]): ChartPoint[] {
    return items.map((stats) => ({
      name: stats.matchday.toString(),
      value: stats.avgPoints,
      valueDiff: stats.avgPointsDiff,
      order: stats.matchday,
      valueSuffix: 'pts'
    }));
  }
}
