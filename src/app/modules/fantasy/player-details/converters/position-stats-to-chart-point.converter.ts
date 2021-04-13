import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ChartPoint } from 'src/app/shared/components/chart/models/chart-point.model';
import { PositionStatsMatchday } from 'src/app/store/positions/models/position-stats-matchday.model';

export class PositionStatsToChartPointConverter implements Convertable<PositionStatsMatchday, ChartPoint> {
  public convert(items: PositionStatsMatchday[]): ChartPoint[] {
    return items.map((stats) => ({
      name: stats.matchday.toString(),
      value: stats.top10PlayersAvgPoints,
      valueDiff: stats.top10PlayersAvgPointsDiff,
      valueSuffix: 'pts'
    }));
  }
}
