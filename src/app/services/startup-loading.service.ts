import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';

export interface StartupLoadingState {
  gk: boolean;
  def: boolean;
  mid: boolean;
  for: boolean;
  properties: boolean;
  lastUpdated: boolean;
}

@Injectable({ providedIn: 'root' })
export class StartupLoadingService {
  private loadingState: StartupLoadingState = {
    gk: false,
    def: false,
    mid: false,
    for: false,
    properties: false,
    lastUpdated: false
  };

  private playersLoading$ = new Subject<StartupLoadingState>();

  public endLoadingGk() {
    this.loadingState.gk = true;
    this.sendLoadingState();
  }

  public endLoadingDef() {
    this.loadingState.def = true;
    this.sendLoadingState();
  }

  public endLoadingMid() {
    this.loadingState.mid = true;
    this.sendLoadingState();
  }

  public endLoadingFor() {
    this.loadingState.for = true;
    this.sendLoadingState();
  }

  public endLoadingProperties() {
    this.loadingState.properties = true;
    this.sendLoadingState();
  }

  public endLoadingLastUpdated() {
    this.loadingState.lastUpdated = true;
    this.sendLoadingState();
  }

  public select(): Observable<StartupLoadingState> {
    return this.playersLoading$.asObservable().pipe();
  }

  public selectAllLoaded(): Observable<boolean> {
    return this.playersLoading$.pipe(
      delay(500),
      map((state) => Object.values(state).every((loaded) => loaded)),
      distinctUntilChanged()
    );
  }

  public count(): number {
    return Object.keys(this.loadingState).length;
  }

  private sendLoadingState(): void {
    this.playersLoading$.next({ ...this.loadingState });
  }
}
