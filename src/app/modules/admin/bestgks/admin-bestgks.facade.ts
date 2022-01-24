import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompareBestGks } from 'src/app/store/compare/models/compare-best-gks.model';
import { AdminBestGksState } from './logic/models/admin-best-gks-state.model';
import { AdminBestGksSaverServer } from './logic/services/admin-best-gks-saver.service';
import { AdminBestGksStateLoader } from './logic/services/admin-best-gks-state.loader';

@Injectable()
export class AdminBestGksFacade {
  constructor(private stateLoader: AdminBestGksStateLoader, private saver: AdminBestGksSaverServer) {}

  public loadState(): Observable<AdminBestGksState> {
    return this.stateLoader.load();
  }

  public save(compareBestGks: CompareBestGks) {
    return this.saver.save(compareBestGks);
  }
}
