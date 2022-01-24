import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareQuickLinkFilters } from '../models/players-compare-quick-link-filters.model';
import { PlayersCompareQuickLinkLoaderFactory } from './quick-links/players-compare-quick-link-loader.factory';
import { PlayersCompareQuickLinkType } from './quick-links/players-compare-quick-link-type.enum';

@Injectable()
export class PlayersCompareQuickLinkGuard implements CanActivate {
  constructor(private quickLinkLoaderFactory: PlayersCompareQuickLinkLoaderFactory, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    Logger.logDev('players compare quick link guard, checking...');
    const type = route.paramMap.get('type');
    const filters = this.getFiltersFromQueryParams(route.queryParams);

    Logger.logDev(
      `players compare quick link guard, loading ids for type: ${type}, filters: ${JSON.stringify(filters)}`
    );

    const idsLoader = this.quickLinkLoaderFactory.create(<PlayersCompareQuickLinkType>type);

    return idsLoader.loadIds(filters).pipe(
      tap((ids) => Logger.logDev(`players compare quick link guard, got ids: ${ids.join(',')}`)),
      tap((ids) =>
        this.router.navigate(['fantasy', 'compare'], {
          queryParams: { fromQuickLink: 'true', ids }
        })
      ),
      mapTo(false)
    );
  }

  private getFiltersFromQueryParams(queryParams: Params): PlayersCompareQuickLinkFilters {
    return {
      position: queryParams.position,
      count: queryParams.count ?? 6,
      maxPrice: queryParams.maxPrice
    };
  }
}
