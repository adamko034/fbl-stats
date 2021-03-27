import { Injectable } from '@angular/core';
import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerDetailsFantasy } from '../../models/player-details-fantasy.model';

@Injectable()
export class PlayerDetailsFantasyCreator {
  constructor(private formCalculator: PlayerFormCalculatorService, private playersDataService: PlayersDataService) {}

  public from(player: Player): PlayerDetailsFantasy {
    const last5 = this.formCalculator.calculateLastN(player.games, 5);
    return {
      price: player.price,
      popularity: player.popularity,
      totalPoints: player.totalPoints,
      top100Popularity: player.top100Popularity,
      last5,
      lastMD: this.formCalculator.getLastMD(player.games),
      seasonAvg: Math.round((player.totalPoints / player.games.length) * 10) / 10,
      last5Avg: Math.round((last5 / 5) * 10) / 10,
      bestGame: this.playersDataService.getBestGame(player.games),
      worstGame: this.playersDataService.getWorstGame(player.games),
      pointsPer1M: Math.round((player.totalPoints / player.price) * 10) / 10,
      history: player.fantasyHistory
    };
  }
}
