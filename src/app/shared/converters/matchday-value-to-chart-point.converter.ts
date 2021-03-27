import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ChartPoint } from '../components/chart/models/chart-point.model';
import { MatchdayValue } from '../models/matchday-value.model';

export class MatchdayValueToChartPointConverter implements Convertable<MatchdayValue, ChartPoint> {
  public convert(items: MatchdayValue[]): ChartPoint[] {
    return items.map((item) => ({ name: item.matchday.toString(), value: item.value }));
  }
}
