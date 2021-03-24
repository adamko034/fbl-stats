import { PlayerFormCalculatorService } from 'src/app/modules/core/players/services/player-form-calculator.service';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerListScoringChances } from '../models/player-list-scoring-chances.model';

export class PlayersListScoringChancesConverter implements Convertable<Player, PlayerListScoringChances> {
  constructor(private type: 'overall' | 'last5', private formCalculator: PlayerFormCalculatorService) {}

  public convert(items: Player[]): PlayerListScoringChances[] {
    return items.map((player) => {
      const scoringChances = player.scoringChances[this.type];

      return {
        lastName: player.lastName,
        moreThan10PtsGamesCount: scoringChances.moreThan10ptsGamesCount,
        moreThan10PtsPercentage: this.getPercentage(scoringChances.moreThan10ptsGamesCount, scoringChances.gamesCount),
        moreThan15PtsGamesCount: scoringChances.moreThan15ptsGamesCount,
        moreThan15PtsPercentage: this.getPercentage(scoringChances.moreThan15ptsGamesCount, scoringChances.gamesCount),
        moreThan20PtsGamesCount: scoringChances.moreThan20ptsGamesCount,
        moreThan20PtsPercentage: this.getPercentage(scoringChances.moreThan20ptsGamesCount, scoringChances.gamesCount),
        moreThan5PtsGamesCount: scoringChances.moreThan5ptsGamesCount,
        moreThan5PtsPercentage: this.getPercentage(scoringChances.moreThan5ptsGamesCount, scoringChances.gamesCount),
        name: player.name,
        playerId: player.id,
        teamShort: player.teamShort,
        points: this.getPoints(player),
        gamesCount: scoringChances.gamesCount
      };
    });
  }

  private getPercentage(gamesIncluded: number, gamesAll: number): number {
    return Math.round((gamesIncluded / gamesAll) * 1000) / 10;
  }

  private getPoints(player: Player): number {
    if (this.type === 'overall') {
      return player.totalPoints;
    }

    return this.formCalculator.calculateLastN(player.games, 5);
  }
}
