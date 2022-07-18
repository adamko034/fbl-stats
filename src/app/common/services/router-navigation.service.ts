import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterNavigationService {
  constructor(private _router: Router) {}

  public toSameRouteWithMergedQueryParams(params: Params): void {
    this._router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
  }

  public toSameRouteClearParams(): void {
    this._router.navigate([], { queryParams: null });
  }
}
