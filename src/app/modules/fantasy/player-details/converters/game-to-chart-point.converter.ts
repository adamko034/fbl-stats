import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ChartPoint } from 'src/app/shared/components/chart/models/chart-point.model';
import { PlayerDetailsGame } from '../models/player-details-game.model';

export class GameToChartPointConverter implements Convertable<PlayerDetailsGame, ChartPoint> {
  public convert(items: PlayerDetailsGame[]): ChartPoint[] {
    return items.map((item) => ({ name: item.matchday.toString(), value: item.points }));
  }
}
