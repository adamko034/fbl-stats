import { Injectable } from '@angular/core';
import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerDetailsFantasy } from '../../models/player-details-fantasy.model';

@Injectable()
export class PlayerDetailsFantasyCreator {
  constructor(private formCalculator: PlayerFormCalculatorService) {}

  public from(player: Player): PlayerDetailsFantasy {
    return {
      price: player.price,
      popularity: player.popularity,
      totalPoints: player.totalPoints,
      top100Popularity: player.top100Popularity,
      last5: this.formCalculator.calculateLastN(player.games, 5),
      lastMD: this.formCalculator.getLastMD(player.games)
    };
  }
}
