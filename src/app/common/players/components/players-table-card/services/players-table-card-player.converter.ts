import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerPredictionCombinedDeterminer } from '../../../services/player-prediction-combined-determiner.service';
import { PlayersTableCardPlayer } from '../models/players-table-card-player';

@Injectable()
export class PlayersTableCardPlayerConverter {
  constructor(private predictionDeterminer: PlayerPredictionCombinedDeterminer) {}

  public fromPlayer(player: Player): PlayersTableCardPlayer {
    const {
      id,
      lastName,
      price,
      popularity,
      top100Popularity,
      top500Popularity,
      teamShort,
      position,
      isReturning,
      isSuspensionRisk,
      attendance,
      nextGame,
      totalPoints,
      avgPoints
    } = player;
    return {
      id,
      name: lastName,
      price,
      popularity,
      top100Popularity,
      top500Popularity,
      teamShort,
      position,
      totalPoints,
      isReturning,
      isSuspensionRisk,
      avgPoints,
      isAvailable: attendance === 1,
      prediction: this.predictionDeterminer.determine(nextGame)
    };
  }
}
