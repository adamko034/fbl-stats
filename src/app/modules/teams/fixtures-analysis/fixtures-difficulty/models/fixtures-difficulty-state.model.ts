import { FixturesDifficultyFilters } from './fixtures-difficulty-filters.model';
import { FixturesDifficultyTeam } from './fixtures-difficulty-team.model';

export interface FixturesDifficultyState {
  filters: FixturesDifficultyFilters;
  fixturesDifficultyTeams: FixturesDifficultyTeam[];
}
