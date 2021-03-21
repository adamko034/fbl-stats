import { Game } from 'src/app/models/game.model';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { Convertable } from '../../shared/convertable/convertable';
import { PlayersDataService } from '../services/players-data.service';

export class GameTextValueConverter implements Convertable<Game, TextValue> {
  constructor(private playerDataService: PlayersDataService) {}

  public convert(items: Game[]): TextValue[] {
    return items.map((game) => {
      return {
        text: `MD ${game.matchday}`,
        value: `${game.points.toString()}pts`,
        valueStyle: { color: `'${this.playerDataService.getPointsColor(game.points)}'`, fontWeight: '500' }
      };
    });
  }
}
