import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerSourceLineupPrediction } from '../models/player-source-lineup-prediction.enum';

@Injectable()
export class PlayerPredictionsService {
  public atLeastOneStart(player: Player): boolean {
    return !player.nextGame.lineupPredictions
      .filter((l) => l.attendance !== PlayerSourceLineupPrediction.UNKNOWN)
      .every((l) => l.attendance === PlayerSourceLineupPrediction.BENCH);
  }

  public onlyWithAtLeastOneStart(players: Player[]): Player[] {
    return players.filter((p) => this.atLeastOneStart(p));
  }
}
