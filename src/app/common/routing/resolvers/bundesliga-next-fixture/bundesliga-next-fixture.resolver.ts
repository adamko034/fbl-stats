import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class BundesligaNextFixtureResolver implements Resolve<MatchdayFixtures> {
  constructor(private fixturesStore: FixturesStore, private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<MatchdayFixtures> {
    Logger.logDev('bundesliga next fixure resolver, resolving');

    return this.propertiesStore.selectLastMatchday().pipe(
      tap((lastMatchday) => Logger.logDev(`bundesliga next fixture resolver, matchday equals ${lastMatchday + 1}`)),
      switchMap((lastMatchday) => this.fixturesStore.selectByMatchday(lastMatchday + 1)),
      first()
    );
  }
}
