import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class FixturesLoadedGuard implements CanActivate {
  constructor(private fixturesStore: FixturesStore) {}

  public canActivate(): Observable<boolean> {
    Logger.logDev('fixtures loaded guard, loading...');
    this.fixturesStore.load();

    return this.fixturesStore.selectAll().pipe(
      tap(() => Logger.logDev(`fixtures loaded guard, waiting for import`)),
      filter((fixtures) => !!fixtures && fixtures.length == 34),
      tap(() => Logger.logDev('fitures loaded guard, got fixtures')),
      mapTo(true)
    );
  }
}
