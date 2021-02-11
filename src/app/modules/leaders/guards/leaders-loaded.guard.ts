import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { LeadersStore } from 'src/app/store/leaders/leaders.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class LeadersLoadedGuard implements CanActivate {
  constructor(private store: LeadersStore) {}

  public canActivate(): Observable<boolean> {
    this.store.load();

    return this.store.loaded().pipe(
      tap(() => Logger.logDev('leaders loaded guard, waiting for leaders to be loaded')),
      filter((loaded: boolean) => loaded),
      tap(() => Logger.logDev('leaders loaded guard, got data')),
      mapTo(true)
    );
  }
}
