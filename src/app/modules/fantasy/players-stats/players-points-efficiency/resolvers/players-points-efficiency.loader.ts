import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { PlayersPointsEfficiencyConverter } from '../converters/players-points-efficiency.converter';
import { PlayerPointsEfficiency } from '../models/player-points-efficiency.model';
import { PlayersPointsEfficiencyType } from '../models/players-points-efficiency-type.enum';

@Injectable()
export class PlayersPointsEfficiencyLoader {
  constructor(private playersStore: PlayersStore, private playerFormCalculator: PlayerFormCalculatorService) {}

  public load(
    points: number,
    type: PlayersPointsEfficiencyType,
    position: string
  ): Observable<PlayerPointsEfficiency[]> {
    Logger.logDev('players lists scoring chances loader');
    const pointsFieldName = `scoringChances.${type}.moreThan${points}ptsPercentage`;

    return this.playersStore.selectPlayers().pipe(
      map((players) => {
        return new ArrayStream<Player>(players)
          .filterQuick(
            (p) => !position || position == PlayerPosition.ALL || p.position.toLowerCase() === position.toLowerCase()
          )
          .orderByThenBy({ field: pointsFieldName, order: 'dsc' }, { field: 'totalPoints', order: 'dsc' })
          .take(30)
          .convert(new PlayersPointsEfficiencyConverter(type, this.playerFormCalculator))
          .collect();
      })
    );
  }
}
