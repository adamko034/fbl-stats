import { PlayersFilterGames } from 'src/app/modules/core/players/filter/filters/players-filter-games';
import { PlayersFilterName } from 'src/app/modules/core/players/filter/filters/players-filter-name';
import { PlayersFilterPopularity } from 'src/app/modules/core/players/filter/filters/players-filter-popularity';
import { PlayersFilterPosition } from 'src/app/modules/core/players/filter/filters/players-filter-position';
import { PlayersFilterPrice } from 'src/app/modules/core/players/filter/filters/players-filter-price';
import { PlayersFilterReturning } from 'src/app/modules/core/players/filter/filters/players-filter-returning';
import { PlayersFilterTeams } from 'src/app/modules/core/players/filter/filters/players-filter-teams';
import { PlayersFilterUnavailable } from 'src/app/modules/core/players/filter/filters/players-filter-unavailable';
import { PlayersFilterService } from 'src/app/modules/core/players/filter/players-filter.service';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayersFilters } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersTableFilter implements Filterable<Player> {
  private playersFilterService: PlayersFilterService;

  constructor(private playersFilters: PlayersFilters, private lastMatchday: number) {
    this.playersFilterService = new PlayersFilterService();
    this.registerFilters();
  }

  public filter(items: Player[]): Player[] {
    return this.playersFilterService.filter(items);
  }

  private registerFilters(): void {
    const filters = [
      new PlayersFilterName(this.playersFilters.name),
      new PlayersFilterPosition(this.playersFilters.position),
      new PlayersFilterPrice(this.playersFilters.price),
      new PlayersFilterPopularity(this.playersFilters.popularity),
      new PlayersFilterUnavailable(this.playersFilters.hideUnavailable),
      new PlayersFilterReturning(this.playersFilters.showOnlyReturning),
      new PlayersFilterTeams(this.playersFilters.teams),
      new PlayersFilterGames(this.lastMatchday, this.playersFilters.matchdays)
    ];

    this.playersFilterService.registerFilters(filters);
  }
}
