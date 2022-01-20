import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersFilterPosition } from 'src/app/modules/core/players/filter/filters/players-filter-position';
import { PlayersFilterPrice } from 'src/app/modules/core/players/filter/filters/players-filter-price';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PlayersCompareQuickLinkFilters } from '../../models/players-compare-quick-link-filters.model';
import { PlayersCompareQuickLinkLoader } from './players-compare-quick-link.loader';

export class PlayersCompareQuickLinkTopLoader extends PlayersCompareQuickLinkLoader {
  constructor(private playersStore: PlayersStore) {
    super();
  }

  public loadIds(filters: PlayersCompareQuickLinkFilters): Observable<string[]> {
    return this.playersStore.selectPlayers().pipe(
      map((players) => {
        let stream = new ArrayStream<Player>(players);

        if (filters.position) {
          stream = stream.filter(new PlayersFilterPosition(filters.position));
        }

        if (filters.maxPrice) {
          stream = stream.filter(new PlayersFilterPrice(filters.maxPrice));
        }

        return stream
          .orderBy('totalPoints', 'dsc')
          .take(filters.count)
          .collect()
          .map((p) => p.id);
      })
    );
  }
}
