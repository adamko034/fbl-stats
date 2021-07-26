import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class NextMatchdaysFirstGamesResolver implements Resolve<MatchdayFixtures[]> {
  constructor(private store: FixturesStore) {}

  public resolve(): Observable<MatchdayFixtures[]> {
    Logger.logDev('next matchdays first games resolver, resolving');
    return this.store.selectAll().pipe(
      first(),
      map((matchdaysFixutres) => matchdaysFixutres.filter((m) => m.isConfirmed)),
      tap((matchdaysFixutres) =>
        Logger.logDev(`next matchdays first games resolver, got ${matchdaysFixutres?.length} confirmed matchdayss`)
      )
    );
  }
}
