import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class BundesligaNextFixturesResolver implements Resolve<MatchdayFixtures[]> {
  constructor(private fixturesStore: FixturesStore, private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<MatchdayFixtures[]> {
    Logger.logDev('bundesliga next fixures resolver, resolving');

    return combineLatest([this.fixturesStore.selectAll(), this.propertiesStore.selectLastMatchday()]).pipe(
      tap(([fixtures, lastMatchday]) =>
        Logger.logDev(`bundesliga next fixtures resolver, matchdays greater than ${lastMatchday}`)
      ),
      map(([fixtures, lastMatchday]) => fixtures.filter((f) => f.matchdayNumber > lastMatchday)),
      first(),
      tap((fixtures) => Logger.logDev(`bundesliga next fixtures resolver, got ${fixtures?.length} matchdays`))
    );
  }
}
