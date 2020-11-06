import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingState = { players: true, properites: true, lastUpdated: true };

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

  public select(): Observable<boolean> {
    return this.playersLoading$.asObservable().pipe(distinctUntilChanged());
  }

  private sendLoadingState(): void {
    this.playersLoading$.next(
      this.loadingState.properites && this.loadingState.players && this.loadingState.lastUpdated
    );
  }
}
