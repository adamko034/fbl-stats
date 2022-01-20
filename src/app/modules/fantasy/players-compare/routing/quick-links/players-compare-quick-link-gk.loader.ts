import { Observable, of } from 'rxjs';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareQuickLinkFilters } from '../../models/players-compare-quick-link-filters.model';
import { PlayersCompareQuickLinkLoader } from './players-compare-quick-link.loader';

export class PlayersCompareQuickLinkGkLoader extends PlayersCompareQuickLinkLoader {
  public loadIds(filters: PlayersCompareQuickLinkFilters): Observable<string[]> {
    Logger.logDev('players compare quick link best gk loader, loading');
    return of(['876', '588', '1044']);
  }
}
