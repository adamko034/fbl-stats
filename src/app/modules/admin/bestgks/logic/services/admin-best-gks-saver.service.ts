import { Injectable } from '@angular/core';
import { CompareStore } from 'src/app/store/compare/compare.store';
import { CompareBestGks } from 'src/app/store/compare/models/compare-best-gks.model';

@Injectable()
export class AdminBestGksSaverServer {
  constructor(private store: CompareStore) {}

  public save(bestGks: CompareBestGks): void {
    this.store.updateBestGks(bestGks);
  }
}
