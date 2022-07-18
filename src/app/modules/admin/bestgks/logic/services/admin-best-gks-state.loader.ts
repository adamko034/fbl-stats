import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Position } from 'src/app/common/players/models/position.enum';
import { PlayersFiltersBuilder } from 'src/app/modules/core/players/filter/players-filters.builder';
import { PlayersFromStoreFilterService } from 'src/app/modules/core/players/filter/players-from-store-filter.service';
import { CompareStore } from 'src/app/store/compare/compare.store';
import { Logger } from 'src/app/utils/logger';
import { AdminBestGksState } from '../models/admin-best-gks-state.model';

@Injectable()
export class AdminBestGksStateLoader {
  constructor(private playersFilterService: PlayersFromStoreFilterService, private compareStore: CompareStore) {}

  public load(): Observable<AdminBestGksState> {
    Logger.logDev('admin best gks state loader, loading');
    const storeFilters = PlayersFiltersBuilder.instance().withPosition(Position.GK).build();

    return combineLatest([this.playersFilterService.filter(storeFilters), this.compareStore.selectBestGks()]).pipe(
      tap(([goalkeepers, bestGks]) =>
        Logger.logDev(
          `admin best gks state loader, got ${goalkeepers.length} goalkeepers and ${bestGks.ids.length} best gks`
        )
      ),
      map(([goalkeepers, bestGks]) => ({ goalkeepers, bestGks }))
    );
  }
}
