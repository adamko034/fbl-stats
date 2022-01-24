import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { AdminBestGksFacade } from '../admin-bestgks.facade';
import { AdminBestGksState } from '../logic/models/admin-best-gks-state.model';

@Injectable()
export class AdminBestGksResolver implements Resolve<Observable<AdminBestGksState>> {
  constructor(private facade: AdminBestGksFacade) {}

  public resolve(): Observable<AdminBestGksState> {
    Logger.logDev('admin best gks resolver, resolving');
    return this.facade.loadState().pipe(first());
  }
}
