import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { PlayersFilterGames } from 'src/app/modules/core/players/filter/filters/players-filter-games';
import { PlayersFilterPosition } from 'src/app/modules/core/players/filter/filters/players-filter-position';
import { PlayersFilterService } from 'src/app/modules/core/players/filter/players-filter.service';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { MyTeamPlayersFilters } from 'src/app/modules/my-team/models/my-team-players-filters.model';
import { Player } from 'src/app/store/players/models/player.model';

export class MyTeamPlayersFitler implements Filterable<Player> {
  private playersFilterService: PlayersFilterService;

  constructor(myTeamFilters: MyTeamPlayersFilters, lastMatchday: number) {
    this.playersFilterService = new PlayersFilterService();
    this.registerFilters(myTeamFilters, lastMatchday);
  }

  private registerFilters(myTeamFilters: MyTeamPlayersFilters, lastMatchday: number): void {
    const filters: PlayersFilter[] = [];

    filters.push(new PlayersFilterPosition(myTeamFilters.position));
    filters.push(new PlayersFilterGames(lastMatchday, myTeamFilters.matchdays));

    this.playersFilterService.registerFilters(filters);
  }

  public filter(players: Player[]): Player[] {
    return this.playersFilterService.filter(players);
  }
}
