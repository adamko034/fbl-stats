import { Team } from 'src/app/store/teams/models/team.model';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';
import { FixturesDifficultyTeam } from '../models/fixtures-difficulty-team.model';

export interface IFixturesDifficultyTeamsLoader {
  load(teams: Team[], filters: FixturesDifficultyFilters, nextMatchday: number): FixturesDifficultyTeam[];
}
