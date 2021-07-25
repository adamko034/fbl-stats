import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { PredictedLineupsSource } from 'src/app/modules/teams/lineups/store/models/predicted-lineups-source.model';
import { PredictedLineupsStore } from 'src/app/modules/teams/lineups/store/predicted-lineups.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PredictedLineupsSourcesResolver implements Resolve<PredictedLineupsSource[]> {
  constructor(private store: PredictedLineupsStore) {}

  public resolve(): Observable<PredictedLineupsSource[]> {
    Logger.logDev('predicted lineups sources resolver, resolving...');
    return this.store.selectAllSources().pipe(
      first(),
      tap((sources) => Logger.logDev(`predicted lienups sources resolver, got ${sources.length} sources`))
    );
  }
}
