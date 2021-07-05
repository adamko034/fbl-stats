import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { PlayerDetailsGame } from '../models/player-details-game.model';

export class PlayerDetailsGameTextValueConverter implements Convertable<PlayerDetailsGame, TextValue> {
  constructor(private playerDataService: PlayersDataService) {}

  public convert(items: PlayerDetailsGame[]): TextValue[] {
    return items.map((game) => {
      return {
        text: `MD ${game.matchday} (${game.isHome ? 'h' : 'a'})`,
        value: game.points ? `${game.points.toString()}` : 'x',
        valueStyle: { color: `'${this.playerDataService.getPointsColor(game.points)}'`, fontWeight: '500' }
      };
    });
  }
}
