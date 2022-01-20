import { Observable } from 'rxjs';
import { PlayersCompareQuickLinkFilters } from '../../models/players-compare-quick-link-filters.model';

export abstract class PlayersCompareQuickLinkLoader {
  public abstract loadIds(filters: PlayersCompareQuickLinkFilters): Observable<string[]>;
}
