import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class NextMatchdaysFirstGamesResolver implements Resolve<MatchdayFixtures[]> {
  constructor(private store: FixturesStore, private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<MatchdayFixtures[]> {
    Logger.logDev('next matchdays first games resolver, resolving');

    return combineLatest([this.store.selectAll(), this.propertiesStore.selectLastMatchday()]).pipe(
      tap(([firstGames, lastMatchday]) =>
        Logger.logDev(`next matchdays first games resolver, matchday greater than ${lastMatchday}`)
      ),
      map(([firstGames, lastMatchday]) =>
        firstGames.filter((f) => f.matchdayNumber > lastMatchday && f.matchdayNumber != 34 && f.isConfirmed)
      ),
      first(),
      tap((matchdaysFixutres) =>
        Logger.logDev(`next matchdays first games resolver, got ${matchdaysFixutres?.length} confirmed matchdayss`)
      )
    );
  }
}
