import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';
import { PlayerPosition } from '../../players/models/players-filters';
import { PlayersListScoringChancesConverter } from '../converters/players-list-scoring-chances.converter';
import { PlayerListScoringChances } from '../models/player-list-scoring-chances.model';
import { PlayersListScoringChancesType } from '../models/players-lists-scoring-chancec-type.enum';

@Injectable()
export class PlayersListsScoringChancesLoader {
  constructor(private playersStore: PlayersStore, private playerFormCalculator: PlayerFormCalculatorService) {}

  public load(
    points: number,
    type: PlayersListScoringChancesType,
    position: string
  ): Observable<PlayerListScoringChances[]> {
    Logger.logDev('players lists scoring chances loader');
    const pointsFieldName = `scoringChances.${type}.moreThan${points}ptsPercentage`;

    return this.playersStore.selectPlayers().pipe(
      map((players) => {
        return new ArrayStream<Player>(players)
          .filterQuick(
            (p) => !position || position == PlayerPosition.ALL || p.position.toLowerCase() === position.toLowerCase()
          )
          .orderBy(pointsFieldName, 'dsc')
          .take(30)
          .convert(new PlayersListScoringChancesConverter(type, this.playerFormCalculator))
          .collect();
      })
    );
  }
}
