import { TeamsSchedulesDeterminer } from 'src/app/modules/teams/views/teams-schedules/loaders/strategies/teams-schedules-determiner';
import { NumeralsPipe } from 'src/app/shared/pipes/numerals.pipe';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

export class TeamsSchedulesByRank extends TeamsSchedulesDeterminer {
  private numeralsPipe: NumeralsPipe;

  constructor(includeVenueCalculation: boolean) {
    super(includeVenueCalculation);
    this.numeralsPipe = new NumeralsPipe();
  }

  protected calculateTeamGameIndex(team: Team): number {
    return this.getIndex(team.rank);
  }

  protected calculateSingleGameIndex(game: Fixture): number {
    return this.getIndex(game.opponentRank);
  }

  protected doForeachTeam(teams: Team[]): void {}

  protected getDisplayedInfoForGame(game: Fixture) {
    return `${this.numeralsPipe.transform(game.opponentRank)} place`;
  }

  private getIndex(rank: number): number {
    if (rank >= 16) {
      return 10;
    }

    if (rank < 16 && rank >= 13) {
      return 8;
    }

    if (rank < 13 && rank >= 10) {
      return 6;
    }

    if (rank < 10 && rank >= 7) {
      return 4;
    }

    if (rank < 7 && rank >= 4) {
      return 2;
    }

    return 0;
  }
}
