import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { PlayersListGenericRowOther } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row-other.mode';
import { PlayersListGenericRow } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row.model';
import { PlayerPointsEfficiency } from '../models/player-points-efficiency.model';

export class PlayersListGenericRowsConverter implements Convertable<PlayerPointsEfficiency, PlayersListGenericRow> {
  constructor() {}

  public convert(items: PlayerPointsEfficiency[]): PlayersListGenericRow[] {
    return items.map((x) => {
      return {
        teamShort: x.teamShort,
        playerId: x.playerId,
        playerName: x.name,
        playerNameShort: x.lastName,
        position: x.position,
        popularity: x.popularity,
        totalPoints: x.totalPoints,
        price: x.price,
        otherValues: [
          this.getOtherValue('5', 1, x.moreThan5PtsPercentage, x.moreThan5PtsGamesCount, x.gamesCount),
          this.getOtherValue('10', 2, x.moreThan10PtsPercentage, x.moreThan10PtsGamesCount, x.gamesCount),
          this.getOtherValue('15', 3, x.moreThan15PtsPercentage, x.moreThan15PtsGamesCount, x.gamesCount),
          this.getOtherValue('20', 4, x.moreThan20PtsPercentage, x.moreThan20PtsGamesCount, x.gamesCount)
        ]
      };
    });
  }

  private getOtherValue(
    field: string,
    order: number,
    percentage: number,
    count: number,
    allCount: number
  ): PlayersListGenericRowOther {
    return {
      order,
      value: `${percentage}% (${count}/${allCount})`,
      key: `moreThan${field}PtsPercentage`
    };
  }
}
