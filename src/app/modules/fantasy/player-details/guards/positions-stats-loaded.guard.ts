import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { PositionsStore } from 'src/app/store/positions/positions.store';

@Injectable()
export class PositionsStatsLoadedGuard implements CanActivate {
  constructor(private positionsStore: PositionsStore) {}

  public canActivate(): Observable<boolean> {
    this.positionsStore.load();

    return this.positionsStore.select().pipe(
      filter((positions) => !!positions),
      mapTo(true)
    );
  }
}
