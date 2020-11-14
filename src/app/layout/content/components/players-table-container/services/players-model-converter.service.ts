import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { PlayerFormCalculatorService } from 'src/app/layout/content/components/players-table-container/services/player-form-calculator.service';
import { Player } from 'src/app/models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayersModelConverter {
  constructor(private playerFormCalculator: PlayerFormCalculatorService) {}

  public toUi(players: Player[]): PlayerUi[] {
    return players.map((p) => this.toUiSingle(p));
  }

  private toUiSingle(player: Player): PlayerUi {
    const { id, name, team, teamShort, popularity, price, games, totalPoints, attendance } = cloneDeep(
      player
    ) as Player;
    return {
      id,
      name,
      team,
      teamShort,
      popularity,
      price,
      totalPoints,
      games,
      attendance,
      form: this.playerFormCalculator.calculate(games)
    };
  }
}
