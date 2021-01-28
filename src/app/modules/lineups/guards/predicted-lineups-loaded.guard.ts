import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { PredictedLineupsStore } from 'src/app/modules/lineups/store/predicted-lineups.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PredictedLineupsLoadedGuard implements CanActivate {
  constructor(private store: PredictedLineupsStore) {}

  public canActivate(): Observable<boolean> {
    Logger.logDev('predicted lienups loaded guard, loading data');
    this.store.load();

    return this.store.selectAllSources().pipe(
      filter((state) => !!state),
      tap(() => Logger.logDev('predicted lineups loaded guard, got data')),
      mapTo(true)
    );
  }
}
