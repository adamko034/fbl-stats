import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerFormCalculatorService } from '../../../core/players/services/player-form-calculator.service';
import { Convertable } from '../../../core/shared/convertable/convertable';
import { PredictedLineupsStatsPlayer } from '../models/predicted-lineups-stats-player.model';

@Injectable()
export class PredictedLineupsStatsPlayerConverter implements Convertable<Player, PredictedLineupsStatsPlayer> {
  constructor(private formCalculator: PlayerFormCalculatorService) {}

  public convert(items: Player[]): PredictedLineupsStatsPlayer[] {
    return items.map((player) => {
      return {
        playerId: player.id,
        lastName: player.lastName,
        name: player.name,
        popularity: player.popularity,
        top100Popularity: player.top100Popularity,
        totalPoints: player.totalPoints,
        teamShort: player.teamShort,
        last5Form: this.formCalculator.calculateLastN(player.games, 5)
      };
    });
  }
}
