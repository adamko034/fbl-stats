import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { FixturesKickoffTimesState } from '../models/fixtures-kickoff-times-state.model';
import { FixturesKickoffTimesFiltersService } from '../services/fixtures-kickoff-times-filters.service';

@Injectable()
export class FixturesKickoffTimesResolver implements Resolve<Observable<FixturesKickoffTimesState>> {
  constructor(private filtersService: FixturesKickoffTimesFiltersService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FixturesKickoffTimesState> {
    Logger.logDev('fixures kickoff times resolver, resolving...');
    return of(null).pipe(
      map((_) => {
        const filters = this.filtersService.fromQueryParams(route.queryParams);

        return { filters };
      }),
      tap((state) =>
        Logger.logDev(`fixtures kickoff times resolver, got data, filters: ${JSON.stringify(state.filters)}`)
      ),
      first()
    );
  }
}
