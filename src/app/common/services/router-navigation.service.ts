import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterNavigationService {
  private _history: string[] = [];
  private _history$ = new BehaviorSubject<string[]>([]);

  constructor(private _router: Router, private location: Location) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger !== 'popstate') {
          this._history.push(event.url);
          this._history$.next(this._history);
        }
      }
    });
  }

  public hasBackUrl(): Observable<boolean> {
    return this._history$.asObservable().pipe(map((history) => history.length > 1));
  }

  public goBack(): void {
    this._history.pop();
    this._history$.next(this._history);

    if (this._history.length > 0) {
      this.location.back();
    }
  }

  public toSameRouteWithMergedQueryParams(params: Params): void {
    this._router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
  }

  public toSameRouteClearParams(): void {
    this._router.navigate([], { queryParams: null });
  }
}
