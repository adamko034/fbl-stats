import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { CompareStore } from 'src/app/store/compare/compare.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PlayersCompareBestGksGuard implements CanActivate {
  constructor(private compareStore: CompareStore) {}

  public canActivate(): Observable<boolean> {
    Logger.logDev('players compare best gks guard, loading data');
    this.compareStore.load();

    return this.compareStore.loaded().pipe(
      tap((_) => Logger.logDev('players compare best gks guard, waiting for data')),
      filter((loaded) => loaded),
      mapTo(true),
      tap((_) => Logger.logDev('players compare best gks guard, got data'))
    );
  }
}
