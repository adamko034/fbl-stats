import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { CompareStore } from 'src/app/store/compare/compare.store';
import { PlayersCompareQuickLinkFilters } from '../../models/players-compare-quick-link-filters.model';
import { PlayersCompareQuickLinkLoader } from './players-compare-quick-link.loader';

export class PlayersCompareQuickLinkGkLoader extends PlayersCompareQuickLinkLoader {
  constructor(private compareStore: CompareStore) {
    super();
  }

  public loadIds(filters: PlayersCompareQuickLinkFilters): Observable<string[]> {
    this.compareStore.load();

    return this.compareStore.loaded().pipe(
      filter((loaded) => loaded),
      switchMap(() => this.compareStore.selectBestGks()),
      map((bestGks) => bestGks?.ids || []),
      first()
    );
  }
}
