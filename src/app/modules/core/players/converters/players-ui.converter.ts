import { Injectable } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayerAttendancePredictionService } from 'src/app/modules/core/players/services/player-attendance-prediction.service';
import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayersUiConverter implements Convertable<Player, PlayerUi> {
  constructor(
    private playerFormCalculator: PlayerFormCalculatorService,
    private playerAttendacePredictionService: PlayerAttendancePredictionService
  ) {}

  public convert(players: Player[]): PlayerUi[] {
    return players.map((p) => this.toUiSingle(p));
  }

  private toUiSingle(player: Player): PlayerUi {
    const predicion = this.playerAttendacePredictionService.determine(player.nextGame?.lineupPredictions);
    const {
      id,
      name,
      team,
      teamShort,
      popularity,
      price,
      games,
      avgPoints,
      totalPoints,
      attendance,
      nextGame,
      position,
      isSuspensionRisk,
      isReturning,
      top100Popularity
    } = { ...player } as Player;
    return {
      id,
      name,
      team,
      teamShort,
      popularity,
      position,
      price,
      totalPoints,
      avgPoints,
      games,
      leadersPopularity: top100Popularity,
      attendance,
      nextGameAttendancePrediction: predicion,
      form: this.playerFormCalculator.calculate(games),
      nextGame,
      isSuspensionRisk,
      isReturning
    };
  }
}
