import { FixturesDifficultyCalculation } from './fixtures-difficulty-calculation.enum';

export interface FixturesDifficultyFilters {
  calculation: FixturesDifficultyCalculation;
  matchdays: number;
  includeVenue: boolean;
  formMatchdays: number;
}
