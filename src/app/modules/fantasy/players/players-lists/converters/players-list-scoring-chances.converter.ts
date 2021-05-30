import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerListScoringChances } from '../models/player-list-scoring-chances.model';
import { PlayersListScoringChancesType } from '../models/players-lists-scoring-chancec-type.enum';

export class PlayersListScoringChancesConverter implements Convertable<Player, PlayerListScoringChances> {
  constructor(private type: PlayersListScoringChancesType, private formCalculator: PlayerFormCalculatorService) {}

  public convert(items: Player[]): PlayerListScoringChances[] {
    return items.map((player) => {
      const scoringChances = player.scoringChances[this.type];

      return {
        lastName: player.lastName,
        moreThan10PtsGamesCount: scoringChances.moreThan10ptsGamesCount,
        moreThan10PtsPercentage: scoringChances.moreThan10ptsPercentage,
        moreThan15PtsGamesCount: scoringChances.moreThan15ptsGamesCount,
        moreThan15PtsPercentage: scoringChances.moreThan15ptsPercentage,
        moreThan20PtsGamesCount: scoringChances.moreThan20ptsGamesCount,
        moreThan20PtsPercentage: scoringChances.moreThan20ptsPercentage,
        moreThan5PtsGamesCount: scoringChances.moreThan5ptsGamesCount,
        moreThan5PtsPercentage: scoringChances.moreThan5ptsPercentage,
        name: player.name,
        playerId: player.id,
        teamShort: player.teamShort,
        points: this.getPoints(player),
        gamesCount: scoringChances.gamesCount
      };
    });
  }

  private getPoints(player: Player): number {
    if (this.type === 'overall') {
      return player.totalPoints;
    }

    return this.formCalculator.calculateLastN(player.games, 5);
  }
}
