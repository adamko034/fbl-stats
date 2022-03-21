import { Injectable } from '@angular/core';
import { FixturesDifficultyCalculation } from '../models/fixtures-difficulty-calculation.enum';
import { FixtureDifficultyColorsService } from '../services/fixture-difficulty-colors.service';
import { IFixturesDifficultyTeamsLoader } from './fixtures-difficulty-teams-loader';
import { FixturesDifficultyTeamsLoaderByForm } from './fixtures-difficulty-teams-loader-by-form';
import { FixturesDifficultyTeamsLoaderByRank } from './fixtures-difficulty-teams-loader-by-rank';

@Injectable()
export class FixturesDifficultyTeamsLoaderFactory {
  constructor(private fixturesDifficultyColorService: FixtureDifficultyColorsService) {}

  public create(calculationType: FixturesDifficultyCalculation): IFixturesDifficultyTeamsLoader {
    if (calculationType === FixturesDifficultyCalculation.BY_FORM) {
      return new FixturesDifficultyTeamsLoaderByForm();
    }

    return new FixturesDifficultyTeamsLoaderByRank(this.fixturesDifficultyColorService);
  }
}
