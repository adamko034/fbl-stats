import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from 'src/app/utils/logger';
import { FixturesDifficultyLoader } from '../loaders/fixtures-difficulty.loader';
import { FixturesDifficultyByRank } from '../loaders/strategies/fixtures-difficulty-by-rank';
import { FixturesDifficultyState } from '../models/fixtures-difficulty.state';
import { FixtureDifficultyColorsService } from '../services/fixture-difficulty-colors.service';
import { fixturesDifficultyVariables } from '../static/fixtures-difficulty-variables.static';

@Injectable()
export class FixturesDifficultyByRankResolver implements Resolve<FixturesDifficultyState> {
  constructor(
    private teamsSchedulesLoader: FixturesDifficultyLoader,
    private fixtureDifficultyColorsService: FixtureDifficultyColorsService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesDifficultyState> {
    Logger.logDev('teams schedules by rank resolver, resolving...');
    const includeVenue = !!route.queryParams.includeVenue
      ? route.queryParams.includeVenue.toLowerCase() === 'true'
      : fixturesDifficultyVariables.defaultVenueCalculation;
    return this.teamsSchedulesLoader.load(
      new FixturesDifficultyByRank(includeVenue, this.fixtureDifficultyColorsService)
    );
  }
}
