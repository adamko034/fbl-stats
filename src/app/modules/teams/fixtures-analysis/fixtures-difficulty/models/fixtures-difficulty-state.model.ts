import { FixturesDifficultyFilters } from './fixtures-difficulty-filters.model';
import { FixturesDifficultyTeam } from './fixtures-difficulty-team.model';

export interface FixturesDifficultyStateNew {
  filters: FixturesDifficultyFilters;
  nextMatchday: number;
  fixturesDifficultyTeams: FixturesDifficultyTeam[];
}
