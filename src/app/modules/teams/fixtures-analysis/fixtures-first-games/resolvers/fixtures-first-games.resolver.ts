import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { FixturesFirstGamesMatchdaysLoader } from '../logic/fixtures-first-games-matchdays.loader';
import { FixturesFirstGamesTeamsLoader } from '../logic/fixtures-first-games-teams.loader';
import { FixturesFirstGamesState } from '../models/fixtures-first-games.state';
import { FixturesFirstGamesFiltersService } from '../services/fixtures-first-games-filters.service';

@Injectable()
export class FixturesFirstGamesResolver implements Resolve<Observable<FixturesFirstGamesState>> {
  constructor(
    private filtersService: FixturesFirstGamesFiltersService,
    private teamsLoader: FixturesFirstGamesTeamsLoader,
    private matchdaysLoader: FixturesFirstGamesMatchdaysLoader,
    private teamsStore: TeamsStore,
    private fixturesStore: FixturesStore,
    private propertiesStore: PropertiesStore,
    private unlimitedTransfersService: UnlimitedTransfersService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesFirstGamesState> {
    Logger.logDev('fixtures first games resolver, resolving ...');

    return combineLatest([
      this.teamsStore.selectAll(),
      this.fixturesStore.selectAll(),
      of(route.queryParams),
      this.propertiesStore.selectLastMatchday(),
      this.unlimitedTransfersService.matchdaysUntilNext
    ]).pipe(
      map(([teams, fixtures, queryParams, lastMatchday, matchdaysUntilUnlimitedTransfers]) => {
        const filters = this.filtersService.fromQueryParams(queryParams);
        if (filters.matchdays === 0) {
          filters.matchdays = matchdaysUntilUnlimitedTransfers;
        }

        const firstGamesTeams = this.teamsLoader.load(teams, filters, lastMatchday + 1);
        const firstGamesMatchdays = this.matchdaysLoader.load(fixtures, filters, lastMatchday + 1);

        return { teams: firstGamesTeams, filters, matchdays: firstGamesMatchdays, nextMatchday: lastMatchday + 1 };
      }),
      tap((state) =>
        Logger.logDev(
          `fixtures fist games resolver, got ${state.teams.length} teams, ${
            state.matchdays.length
          } matchdays and filters ${JSON.stringify(state.filters)}`
        )
      ),
      first()
    );
  }
}
