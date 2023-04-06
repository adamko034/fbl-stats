import { Injectable } from '@angular/core';
import { FixtureDifficultyService } from 'src/app/common/teams/services/fixture-difficulty.service';
import { FixturesDifficultyCalculation } from '../models/fixtures-difficulty-calculation.enum';
import { IFixturesDifficultyTeamsLoader } from './fixtures-difficulty-teams-loader';
import { FixturesDifficultyTeamsLoaderByForm } from './fixtures-difficulty-teams-loader-by-form';
import { FixturesDifficultyTeamsLoaderByRank } from './fixtures-difficulty-teams-loader-by-rank';

@Injectable()
export class FixturesDifficultyTeamsLoaderFactory {
  constructor(private fixtureDifficultyService: FixtureDifficultyService) {}

  public create(calculationType: FixturesDifficultyCalculation): IFixturesDifficultyTeamsLoader {
    if (calculationType === FixturesDifficultyCalculation.BY_FORM) {
      return new FixturesDifficultyTeamsLoaderByForm(this.fixtureDifficultyService);
    }

    return new FixturesDifficultyTeamsLoaderByRank(this.fixtureDifficultyService);
  }
}
