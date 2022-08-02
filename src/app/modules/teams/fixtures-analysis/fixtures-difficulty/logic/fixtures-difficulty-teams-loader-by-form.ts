import { ArrayStream } from 'src/app/services/array-stream.service';
import { Range } from 'src/app/shared/models/range.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';
import { FixturesDifficultyTeamGame } from '../models/fixtures-difficulty-team-game.model';
import { FixturesDifficultyTeam } from '../models/fixtures-difficulty-team.model';
import { FixtureDifficultyColorsService } from '../services/fixture-difficulty-colors.service';
import { IFixturesDifficultyTeamsLoader } from './fixtures-difficulty-teams-loader';

export class FixturesDifficultyTeamsLoaderByForm implements IFixturesDifficultyTeamsLoader {
  private indexValueRanges: { [value: number]: Range } = {
    10: { min: 0, max: 39 },
    8: { min: 40, max: 69 },
    6: { min: 70, max: 99 },
    4: { min: 100, max: 119 },
    2: { min: 120, max: 139 },
    0: { min: 140, max: 181 }
  };
  private teamPoints: { [teamShort: string]: number }[] = [];

  constructor(private fixturesDifficultyColorService: FixtureDifficultyColorsService) {}

  public load(teams: Team[], filters: FixturesDifficultyFilters, nextMatchday: number): FixturesDifficultyTeam[] {
    return new ArrayStream<Team>(teams)
      .forEachQuick((team) => this.setTeamPoints(team, filters.formMatchdays, nextMatchday - 1))
      .convertQuick((team) => {
        const fixtures = this.getFixtures(team, filters);
        const totalIndex = new ArrayStream<FixturesDifficultyTeamGame>(fixtures).sumBy((f) => f.index);
        const index = this.calculateIndex(team.shortName, filters.formMatchdays);

        return {
          teamShort: team.shortName,
          rank: team.rank,
          fixtures,
          index: totalIndex,
          value: this.getTeamPoints(team.shortName),
          color: this.fixturesDifficultyColorService.getColor(index)
        };
      })
      .orderByThenBy({ field: 'index', order: 'dsc' }, { field: 'rank', order: 'asc' })
      .collect();
  }

  private getFixtures(team: Team, filters: FixturesDifficultyFilters): FixturesDifficultyTeamGame[] {
    return new ArrayStream<Fixture>(team.games)
      .filterQuick((f) => filters.matchdays.from <= f.matchday && f.matchday <= filters.matchdays.to)
      .convertQuick((f) => this.toFixtureDifficulty(f, filters.formMatchdays))
      .forEachQuick((f) => this.includeVenueCalculation(f, filters.includeVenue))
      .orderBy('matchday', 'asc')
      .collect();
  }

  private toFixtureDifficulty(fixture: Fixture, includeMatchdays: number): FixturesDifficultyTeamGame {
    const { isHome, isMatchdayFirstGame, isStandaloneFixture, wasPostponed, matchday, opponent, opponentRank } =
      fixture;
    const index = this.calculateIndex(fixture.opponent, includeMatchdays);
    const opponentPoints = this.teamPoints[fixture.opponent];

    return {
      isHome,
      isFirstGame: isMatchdayFirstGame,
      isStandalone: isStandaloneFixture,
      isPostponed: wasPostponed,
      matchday,
      opponentRank,
      opponentShort: opponent,
      displayedText: `${opponentPoints}pts`,
      color: this.fixturesDifficultyColorService.getColor(index),
      index
    };
  }

  private includeVenueCalculation(fixture: FixturesDifficultyTeamGame, includeVenue: boolean): void {
    if (includeVenue) {
      fixture.isHome ? (fixture.index += 1) : (fixture.index -= 1);
    }
  }

  private setTeamPoints(team: Team, includeMatchdays: number, lastMatchday: number): void {
    const points = new ArrayStream<Fixture>(team.games)
      .filterQuick((f) => lastMatchday - includeMatchdays < f.matchday && f.matchday <= lastMatchday)
      .sumBy((f) => f.points);

    this.teamPoints[team.shortName] = points;
  }

  private getTeamPoints(teamShort: string): number {
    return this.teamPoints[teamShort];
  }

  private calculateIndex(teamShort: string, includeMatchdays: number): number {
    const points = this.getTeamPoints(teamShort);
    return this.getSingleGameIndex(points, includeMatchdays);
  }

  private getSingleGameIndex(opponentPoints: number, inncludedGames: number): number {
    const index = opponentPoints * (180 / (inncludedGames * 3));

    const key = Object.keys(this.indexValueRanges).find((value) => {
      const min = this.indexValueRanges[value].min;
      const max = this.indexValueRanges[value].max;

      return min <= index && index < max;
    });

    return +key;
  }
}
