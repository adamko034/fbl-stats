import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { PositionsStore } from 'src/app/store/positions/positions.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PositionsStatsLoadedGuard implements CanActivate {
  constructor(private positionsStore: PositionsStore) {}

  public canActivate(): Observable<boolean> {
    Logger.logDev('PositionsStatsLoadedGuard: loading');
    this.positionsStore.load();

    return this.positionsStore.select().pipe(
      tap(() => Logger.logDev('PositionsStatsLoadedGuard: waiting for data')),
      filter((positions) => !!positions),
      tap(() => Logger.logDev('PositionsStatsLoadedGuard: got data')),
      mapTo(true)
    );
  }
}
