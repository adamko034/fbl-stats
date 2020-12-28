import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlayerDetailsLoadingService {
  private loading: { [key: string]: boolean } = {};
  private loading$: ReplaySubject<boolean>;

  public isLoading(): Observable<boolean> {
    if (!this.loading$) {
      this.loading$ = new ReplaySubject<boolean>(1);
    }

    return this.loading$.asObservable().pipe(startWith(true), distinctUntilChanged());
  }

  public startLoading(key: string): void {
    this.loading[key] = true;
    this.send();
  }

  public endLoading(key: string): void {
    this.loading[key] = false;
    this.send();
  }

  private send(): void {
    if (!this.loading$) {
      this.loading$ = new ReplaySubject<boolean>(1);
    }

    const isLoading = Object.values(this.loading).some((loading) => loading);
    this.loading$.next(isLoading);
  }
}
