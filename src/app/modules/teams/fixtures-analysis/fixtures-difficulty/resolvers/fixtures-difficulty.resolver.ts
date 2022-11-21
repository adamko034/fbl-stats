import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { FixturesDifficultyTeamsLoaderFactory } from '../logic/fixtures-difficulty-teams-loader-factory';
import { FixturesDifficultyCalculation } from '../models/fixtures-difficulty-calculation.enum';
import { FixturesDifficultyFilters } from '../models/fixtures-difficulty-filters.model';
import { FixturesDifficultyState } from '../models/fixtures-difficulty-state.model';
import { FixturesDifficultyFiltersService } from '../services/fixtures-difficulty-filters.service';

@Injectable()
export class FixturesDifficultyResolver implements Resolve<Observable<FixturesDifficultyState>> {
  constructor(
    private fitlersService: FixturesDifficultyFiltersService,
    private propertiesStore: PropertiesStore,
    private teamsStore: TeamsStore,
    private fixturesDifficultyLoaderFactory: FixturesDifficultyTeamsLoaderFactory,
    private unlimitedTransfersService: UnlimitedTransfersService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesDifficultyState> {
    Logger.logDev('fixtures difficulty resolver, resolving...');

    return combineLatest([
      this.propertiesStore.selectLastMatchday(),
      this.unlimitedTransfersService.matchdaysUntilNext,
      this.teamsStore.selectAll()
    ]).pipe(
      map(([lastMatchday, mdsToNextUnlimitedTransfers, teams]) => {
        const defaultFilters: FixturesDifficultyFilters = {
          calculation: FixturesDifficultyCalculation.BY_RANK,
          formMatchdays: 4,
          includeVenue: false,
          matchdays: {
            from: lastMatchday + 1,
            to:
              mdsToNextUnlimitedTransfers > 4 || mdsToNextUnlimitedTransfers === 0
                ? lastMatchday + 4
                : lastMatchday + mdsToNextUnlimitedTransfers
          }
        };

        const filters = this.fitlersService.resolveFromQueryParams(route.queryParams, defaultFilters);
        const loader = this.fixturesDifficultyLoaderFactory.create(filters.calculation);
        const fixturesDifficulty = loader.load(teams, filters, lastMatchday + 1);

        return { filters, fixturesDifficultyTeams: fixturesDifficulty };
      }),
      tap((state) =>
        Logger.logDev('fixtures difficulty resolver, got state, fitlers: ' + JSON.stringify(state.filters))
      ),
      first()
    );
  }
}
