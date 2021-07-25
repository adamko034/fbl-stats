import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatchdayLoader } from 'src/app/modules/core/matchday/loaders/matchday.loader';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class NextMatchdayResolver implements Resolve<Matchday> {
  constructor(private matchdayLoader: MatchdayLoader) {}

  public resolve(): Observable<Matchday> {
    Logger.logDev('next matchday resolver, resolving...');
    return this.matchdayLoader
      .loadForNextMatchday()
      .pipe(tap((matchday) => Logger.logDev(`next matchday resolver, got matchday ${matchday?.num} data`)));
  }
}
