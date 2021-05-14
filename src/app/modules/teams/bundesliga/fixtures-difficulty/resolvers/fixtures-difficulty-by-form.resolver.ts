import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FixturesDifficultyLoader } from '../loaders/fixtures-difficulty.loader';
import { FixturesDifficultyByForm } from '../loaders/strategies/fixtures-difficulty-by-form';
import { FixturesDifficultyState } from '../models/fixtures-difficulty.state';
import { FixtureDifficultyColorsService } from '../services/fixture-difficulty-colors.service';
import { fixturesDifficultyVariables } from '../static/fixtures-difficulty-variables.static';

@Injectable()
export class FixturesDifficultyByFormResolver implements Resolve<FixturesDifficultyState> {
  constructor(
    private fixturesDifficultyLoader: FixturesDifficultyLoader,
    private fixtureDifficultyColorsService: FixtureDifficultyColorsService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesDifficultyState> {
    const includeVenue = !!route.queryParams.includeVenue
      ? route.queryParams.includeVenue.toLowerCase() === 'true'
      : fixturesDifficultyVariables.defaultVenueCalculation;
    const matchdays = !!route.queryParams.matchdays ? +route.queryParams.matchdays : 5;
    return this.fixturesDifficultyLoader.load(
      new FixturesDifficultyByForm(includeVenue, matchdays, this.fixtureDifficultyColorsService)
    );
  }
}
