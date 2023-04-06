import { NumeralsPipe } from 'src/app/common/pipes/numerals.pipe';
import { FixtureDifficultyService } from 'src/app/common/teams/services/fixture-difficulty.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';
import { FixturesDifficultyTeamGame } from '../models/fixtures-difficulty-team-game.model';
import { FixturesDifficultyTeam } from '../models/fixtures-difficulty-team.model';
import { IFixturesDifficultyTeamsLoader } from './fixtures-difficulty-teams-loader';

export class FixturesDifficultyTeamsLoaderByRank implements IFixturesDifficultyTeamsLoader {
  private _numeralsPipe = new NumeralsPipe();
  constructor(private fixtureDifficultyService: FixtureDifficultyService) {}

  public load(teams: Team[], filters: FixturesDifficultyFilters, nextMatchday: number): FixturesDifficultyTeam[] {
    return new ArrayStream<Team>(teams)
      .convertQuick((team) => {
        const fixtures = this.getFixtures(team, filters);
        const index = new ArrayStream<FixturesDifficultyTeamGame>(fixtures).sumBy((f) => f.index);

        return {
          teamShort: team.shortName,
          rank: team.rank,
          fixtures,
          index,
          value: team.rank,
          color: this.fixtureDifficultyService.cssClassByRank(team.rank)
        };
      })
      .orderByThenBy({ field: 'index', order: 'dsc' }, { field: 'rank', order: 'asc' })
      .collect();
  }

  private getFixtures(team: Team, filters: FixturesDifficultyFilters): FixturesDifficultyTeamGame[] {
    return new ArrayStream<Fixture>(team.games)
      .filterQuick((f) => filters.matchdays.from <= f.matchday && f.matchday <= filters.matchdays.to)
      .convertQuick((f) => this.toFixtureDifficulty(f))
      .forEachQuick((f) => this.includeVenuCalculation(f, filters.includeVenue))
      .orderBy('matchday', 'asc')
      .collect();
  }

  private toFixtureDifficulty(fixture: Fixture): FixturesDifficultyTeamGame {
    const { isHome, isMatchdayFirstGame, isStandaloneFixture, wasPostponed, matchday, opponent, opponentRank } =
      fixture;
    let index = this.fixtureDifficultyService.difficultyIndexByRank(opponentRank);

    return {
      isHome,
      isFirstGame: isMatchdayFirstGame,
      isStandalone: isStandaloneFixture,
      isPostponed: wasPostponed,
      matchday,
      opponentRank,
      opponentShort: opponent,
      displayedText: this._numeralsPipe.transform(opponentRank),
      color: this.fixtureDifficultyService.cssClassByIndex(index),
      index
    };
  }

  private includeVenuCalculation(fixture: FixturesDifficultyTeamGame, includeVenue: boolean): void {
    if (includeVenue) {
      fixture.isHome ? (fixture.index += 1) : (fixture.index -= 1);
    }
  }
}
