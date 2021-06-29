import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ChartPoint } from 'src/app/shared/components/chart/models/chart-point.model';
import { PlayerDetailsGame } from '../models/player-details-game.model';

export class GameToChartPointConverter implements Convertable<PlayerDetailsGame, ChartPoint> {
  public convert(items: PlayerDetailsGame[]): ChartPoint[] {
    return items.map((item) => {
      let valueDiff = null;
      const previous = items.filter((x) => x.matchday === item.matchday - 1);

      if (previous.length === 1) {
        valueDiff = item.points - previous[0].points;
      }

      return {
        name: item.matchday.toString(),
        order: item.matchday,
        value: item.points,
        valueDiff,
        valueSuffix: 'pts'
      };
    });
  }
}
