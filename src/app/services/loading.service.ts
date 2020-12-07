import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingState: { [key: string]: boolean } = {};

  private playersLoading$ = new Subject<boolean>();

  public startLoading(key: string) {
    this.loadingState[key] = false;
    this.sendLoadingState();
  }

  public endLoading(key: string) {
    this.loadingState[key] = true;
    this.sendLoadingState();
  }

  public select(): Observable<boolean> {
    return this.playersLoading$.asObservable().pipe(distinctUntilChanged());
  }

  private sendLoadingState(): void {
    let allLoaded = true;
    for (const key in this.loadingState) {
      if (Object.prototype.hasOwnProperty.call(this.loadingState, key)) {
        if (!this.loadingState[key]) {
          allLoaded = false;
          break;
        }
      }
    }

    this.playersLoading$.next(allLoaded);
  }
}
