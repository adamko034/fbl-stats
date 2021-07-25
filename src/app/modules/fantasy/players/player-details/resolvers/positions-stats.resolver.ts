import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { PositionsStats } from 'src/app/store/positions/models/positions-stats.model';
import { PositionsStore } from 'src/app/store/positions/positions.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PositionsStatsResolver implements Resolve<PositionsStats> {
  constructor(private positionsStore: PositionsStore) {}

  public resolve(): Observable<PositionsStats> {
    Logger.logDev('positions stats resolver, resolving ...');
    return this.positionsStore.select().pipe(
      first(),
      tap(() => Logger.logDev('positions stats resolver, got data'))
    );
  }
}
