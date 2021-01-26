import { TeamsSchedulesDeterminer } from 'src/app/modules/teams/views/teams-schedules/loaders/strategies/teams-schedules-determiner';
import { Range } from 'src/app/shared/models/range.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

export class TeamsSchedulesByForm extends TeamsSchedulesDeterminer {
  private teamsPoints: { [team: string]: number } = {};
  private lastGamesTeamFieldName: string;
  private indexValueRanges: { [value: number]: Range } = {
    10: { min: 0, max: 29 },
    8: { min: 30, max: 59 },
    6: { min: 60, max: 89 },
    4: { min: 90, max: 119 },
    2: { min: 120, max: 139 },
    0: { min: 140, max: 181 }
  };

  constructor(includeVenueCalculation: boolean, private lastGamesCount: number) {
    super(includeVenueCalculation);
    this.lastGamesTeamFieldName = `last${lastGamesCount}Games`;
  }

  protected doForeachTeam(teams: Team[]): void {
    teams.forEach((team) => (this.teamsPoints[team.shortName] = team[this.lastGamesTeamFieldName]));
  }

  protected calculateSingleGameIndex(game: Fixture): number {
    const opponentPoints = this.teamsPoints[game.opponent];
    return +this.getSingleGameIndex(opponentPoints);
  }

  protected getDisplayedInfoForGame(game: Fixture): string {
    return `Last ${this.lastGamesCount}: ${this.teamsPoints[game.opponent]}pts`;
  }

  protected calculateTeamGameIndex(team: Team): number {
    return +this.getSingleGameIndex(this.teamsPoints[team.shortName]);
  }

  private getSingleGameIndex(opponentPoints: number): string {
    const index = opponentPoints * (180 / (this.lastGamesCount * 3));

    return Object.keys(this.indexValueRanges).find((value) => {
      const min = this.indexValueRanges[value].min;
      const max = this.indexValueRanges[value].max;

      return min <= index && index < max;
    });
  }
}
