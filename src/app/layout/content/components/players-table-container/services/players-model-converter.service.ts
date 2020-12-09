import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { PlayerAttendancePredictionService } from 'src/app/layout/content/components/players-table-container/services/player-attendance-prediction.service';
import { PlayerFormCalculatorService } from 'src/app/layout/content/components/players-table-container/services/player-form-calculator.service';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayersModelConverter {
  constructor(
    private playerFormCalculator: PlayerFormCalculatorService,
    private playerAttendacePredictionService: PlayerAttendancePredictionService
  ) {}

  public toUi(players: Player[]): PlayerUi[] {
    return players.map((p) => this.toUiSingle(p));
  }

  private toUiSingle(player: Player): PlayerUi {
    const predicion = this.playerAttendacePredictionService.determine(player.nextGame.lineupPredictions);
    const {
      id,
      name,
      team,
      teamShort,
      popularity,
      price,
      games,
      totalPoints,
      attendance,
      nextGame,
      position
    } = cloneDeep(player) as Player;
    return {
      id,
      name,
      team,
      teamShort,
      popularity,
      position,
      price,
      totalPoints,
      games,
      attendance,
      nextGameAttendancePrediction: predicion,
      form: this.playerFormCalculator.calculate(games),
      nextGame
    };
  }
}
