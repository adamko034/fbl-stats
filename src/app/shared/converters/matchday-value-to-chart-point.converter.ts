import { ChartPoint } from 'src/app/common/components/ui/chart/models/chart-point.model';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { MatchdayValue } from '../models/matchday-value.model';

export class MatchdayValueToChartPointConverter implements Convertable<MatchdayValue, ChartPoint> {
  constructor(private suffix?: string) {}

  public convert(items: MatchdayValue[]): ChartPoint[] {
    return items.map((item) => ({
      name: item.matchday.toString(),
      order: item.matchday,
      value: item.value,
      valueSuffix: this.suffix,
      valueDiff: item.change
    }));
  }
}
