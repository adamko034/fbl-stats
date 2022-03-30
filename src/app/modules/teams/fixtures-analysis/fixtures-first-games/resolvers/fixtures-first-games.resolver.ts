import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FixturesFirstGamesState } from '../models/fixtures-first-games.state';
import { FixturesFirstGamesFiltersService } from '../services/fixtures-first-games-filters.service';

@Injectable()
export class FixturesFirstGamesResolver implements Resolve<Observable<FixturesFirstGamesState>> {
  constructor(private filtersService: FixturesFirstGamesFiltersService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesFirstGamesState> {
    Logger.logDev('fixtures first games resolver, resolving ...');
    return of(route.queryParams).pipe(
      map((params) => this.filtersService.fromQueryParams(params)),
      map((filters) => {
        return { teams: [], matchdays: [], filters };
      }),
      first()
    );
  }
}
