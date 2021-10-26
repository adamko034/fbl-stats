import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { PlayersListGenericRowOther } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row-other.mode';
import { PlayersListGenericRow } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row.model';
import { PlayerGamesPlayed } from '../models/player-games-played.model';

export class PlayedGamesToListGenericConverter implements Convertable<PlayerGamesPlayed, PlayersListGenericRow> {
  constructor(private orderByField: string) {}

  public convert(items: PlayerGamesPlayed[]): PlayersListGenericRow[] {
    return items.map((item) => this.convertSingle(item));
  }

  private convertSingle(player: PlayerGamesPlayed): PlayersListGenericRow {
    const { id, name, lastName, popularity, position, price, teamShort, totalPoints } = player;

    return {
      playerId: id,
      playerName: name,
      playerNameShort: lastName,
      popularity,
      position,
      price,
      teamShort,
      totalPoints,
      otherValues: [
        this.getOtherValue(
          1,
          'gamesPlayedPercentage',
          player.gamesPlayedPercentage,
          player.gamesPlayed,
          player.allGamesCount
        ),
        this.getOtherValue(
          2,
          'gamesStartedPercentage',
          player.gamesStartedPercentage,
          player.gamesStarted,
          player.allGamesCount
        ),
        // this.getOtherValue(
        //   3,
        //   'playedMoreThan70MinPercentageAll',
        //   player.playedMoreThan70MinPercentageAll,
        //   player.playedMoreThan70Min,
        //   player.allGamesCount
        // ),
        this.getOtherValue(
          4,
          'playedMoreThan70MinPercentage',
          player.playedMoreThan70MinPercentage,
          player.playedMoreThan70Min,
          player.gamesPlayed
        )
      ]
    };
  }

  private getOtherValue(
    order: number,
    fieldName: string,
    percentage: number,
    count: number,
    allCount: number
  ): PlayersListGenericRowOther {
    return {
      order,
      hideOnMobile: this.orderByField !== fieldName,
      key: fieldName,
      value: `${percentage}% (${count}/${allCount})`
    };
  }
}
