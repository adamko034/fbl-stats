import { Team } from 'src/app/store/teams/models/team.model';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';
import { FixturesDifficultyTeam } from '../models/fixtures-difficulty-team.model';
import { IFixturesDifficultyTeamsLoader } from './fixtures-difficulty-teams-loader';

export class FixturesDifficultyTeamsLoaderByForm implements IFixturesDifficultyTeamsLoader {
  public load(teams: Team[], filters: FixturesDifficultyFilters, nextMatchday: number): FixturesDifficultyTeam[] {
    return null;
    // return new ArrayStream<Team>(teams)
    //   .convertQuick(team => this.)
  }
}
