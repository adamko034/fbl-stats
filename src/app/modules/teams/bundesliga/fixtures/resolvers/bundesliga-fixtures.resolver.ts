import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class BundesligaFixturesResolver implements Resolve<MatchdayFixtures[]> {
  constructor(private fixturesStore: FixturesStore) {}

  public resolve(): Observable<MatchdayFixtures[]> {
    Logger.logDev('bundesliga fixures resolver, resolving');
    return this.fixturesStore.selectAll().pipe(
      first(),
      tap((fixtures) => Logger.logDev(`bundesliga resolver, got ${fixtures?.length} matchdays`))
    );
  }
}
