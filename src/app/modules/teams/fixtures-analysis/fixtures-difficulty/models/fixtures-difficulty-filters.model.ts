import { FromTo } from 'src/app/shared/models/from-to.model';
import { FixturesDifficultyCalculation } from './fixtures-difficulty-calculation.enum';

export interface FixturesDifficultyFilters {
  calculation: FixturesDifficultyCalculation;
  matchdays: FromTo;
  includeVenue: boolean;
  formMatchdays: number;
}
