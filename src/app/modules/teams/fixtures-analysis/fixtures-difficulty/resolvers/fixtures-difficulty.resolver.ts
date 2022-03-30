import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { FixturesDifficultyTeamsLoaderFactory } from '../logic/fixtures-difficulty-teams-loader-factory';
import { FixturesDifficultyStateNew } from '../models/fixtures-difficulty-state.model';
import { FixturesDifficultyFiltersService } from '../services/fixtures-difficulty-filters.service';

@Injectable()
export class FixturesDifficultyResolver implements Resolve<Observable<FixturesDifficultyStateNew>> {
  constructor(
    private fitlersService: FixturesDifficultyFiltersService,
    private propertiesStore: PropertiesStore,
    private unlimitedTransfersService: UnlimitedTransfersService,
    private teamsStore: TeamsStore,
    private fixturesDifficultyLoaderFactory: FixturesDifficultyTeamsLoaderFactory
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesDifficultyStateNew> {
    Logger.logDev('fixtures difficulty resolver, resolving...');

    return combineLatest([
      this.propertiesStore.selectLastMatchday(),
      this.unlimitedTransfersService.matchdaysUntilNext,
      this.teamsStore.selectAll()
    ]).pipe(
      map(([lastMatchday, matchdaysUntilNextUnlimitedTransfers, teams]) => {
        const filters = this.fitlersService.resolveFromQueryParams(
          route.queryParams,
          matchdaysUntilNextUnlimitedTransfers
        );
        const loader = this.fixturesDifficultyLoaderFactory.create(filters.calculation);
        const fixturesDifficulty = loader.load(teams, filters, lastMatchday + 1);

        return { nextMatchday: lastMatchday + 1, filters, fixturesDifficultyTeams: fixturesDifficulty };
      }),
      tap((state) =>
        Logger.logDev('fixtures difficulty resolver, got state, fitlers: ' + JSON.stringify(state.filters))
      ),
      first()
    );
  }
}
