import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersListScoringChancesConverter } from '../converters/players-list-scoring-chances.converter';
import { PlayerListScoringChances } from '../models/player-list-scoring-chances.model';

@Injectable()
export class PlayersListsScoringChancesLoader {
  constructor(private playersStore: PlayersStore, private playerFormCalculator: PlayerFormCalculatorService) {}

  public load(points: number, type: 'overall' | 'last5'): Observable<PlayerListScoringChances[]> {
    Logger.logDev('players lists scoring chances loader');
    const pointsFiledName = `scoringChances.${type}.moreThan${points}ptsGamesCount`;

    return this.playersStore.selectPlayers().pipe(
      map((players) => {
        return new ArrayStream<Player>(players)
          .orderBy(pointsFiledName, 'dsc')
          .take(30)
          .convert(new PlayersListScoringChancesConverter(type, this.playerFormCalculator))
          .collect();
      })
    );
  }
}
