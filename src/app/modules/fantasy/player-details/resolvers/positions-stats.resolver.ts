import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { PositionsStats } from 'src/app/store/positions/models/positions-stats.model';
import { PositionsStore } from 'src/app/store/positions/positions.store';

@Injectable()
export class PositionsStatsResolver implements Resolve<PositionsStats> {
  constructor(private positionsStore: PositionsStore) {}

  public resolve(): Observable<PositionsStats> {
    return this.positionsStore.select().pipe(first());
  }
}
