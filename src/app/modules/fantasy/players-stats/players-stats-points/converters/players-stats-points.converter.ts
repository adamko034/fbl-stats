import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStatsPointsPlayer } from '../models/players-stats-points-player.model';

@Injectable()
export class PlayersStatsPointsConverter {
  public convert(players: Player[]): PlayersStatsPointsPlayer[] {
    return players.map((player) => this.convertSingle(player));
  }

  public convertSingle(player: Player): PlayersStatsPointsPlayer {
    const { id, name, lastName, position, pointsStats, teamShort, price } = player;
    return { id, name, lastName, position, points: pointsStats, teamShort, price };
  }
}
