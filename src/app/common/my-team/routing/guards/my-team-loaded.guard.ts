import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class MyTeamLoadedGuard implements CanActivate {
  constructor(private myTeamStore: MyTeamStore) {}

  public canActivate(): Observable<boolean> {
    Logger.logDev('my team loaded guard, loading...');
    this.myTeamStore.load();

    return this.myTeamStore.loaded().pipe(
      tap((_) => Logger.logDev('my team loaded guard, waiting...')),
      filter((loaded) => loaded),
      tap((_) => Logger.logDev('my team loaded guard, got it!')),
      mapTo(true)
    );
  }
}
