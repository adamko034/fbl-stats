import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingState = { players: true, properites: true, lastUpdated: true, timeline: true };

  private playersLoading$ = new Subject<boolean>();

  public startLoadingProperties() {
    this.loadingState.properites = false;
    this.sendLoadingState();
  }

  public endLoadingProperties() {
    this.loadingState.properites = true;
    this.sendLoadingState();
  }

  public startLoadingPlayers() {
    this.loadingState.players = false;
    this.sendLoadingState();
  }

  public endLoadingPlayers() {
    this.loadingState.players = true;
    this.sendLoadingState();
  }

  public startLoadingLastUpdated() {
    this.loadingState.lastUpdated = false;
    this.sendLoadingState();
  }

  public endLoadingLastUpdated() {
    this.loadingState.lastUpdated = true;
    this.sendLoadingState();
  }

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
