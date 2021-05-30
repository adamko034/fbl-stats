import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerDetailsGameFilter } from '../models/enums/player-details-game-filter.enum';
import { PlayerDetailsGame } from '../models/player-details-game.model';
import { PlayerDetailsGamesAwayFilter } from './games/player-details-games-away.filter';
import { PlayerDetailsGamesHomeFilter } from './games/player-details-games-home.filter';
import { PlayerDetailsGamesLast5Filter } from './games/player-details-games-last5.filter';
import { PlayerDetailsGamesOverallFilter } from './games/player-details-games-overall.filter';
import { PlayerDetailsGamesVsTopFilter } from './games/player-details-games-vsTop.filter';
import { PlayerDetailsGamesVsWorstFilter } from './games/player-details-games-vsWorst.filter';

export class PlayerDetailsGamesFilters implements Filterable<PlayerDetailsGame> {
  constructor(private filterType: PlayerDetailsGameFilter) {}

  public filter(items: PlayerDetailsGame[]): PlayerDetailsGame[] {
    const filterClass = this.createFilter();
    return filterClass === null ? items : filterClass.filter(items);
  }

  private createFilter(): Filterable<PlayerDetailsGame> {
    switch (this.filterType) {
      case PlayerDetailsGameFilter.OVERALL:
        return new PlayerDetailsGamesOverallFilter();
      case PlayerDetailsGameFilter.AWAY:
        return new PlayerDetailsGamesAwayFilter();
      case PlayerDetailsGameFilter.HOME:
        return new PlayerDetailsGamesHomeFilter();
      case PlayerDetailsGameFilter.LAST5:
        return new PlayerDetailsGamesLast5Filter();
      case PlayerDetailsGameFilter.VsTOP6:
        return new PlayerDetailsGamesVsTopFilter();
      case PlayerDetailsGameFilter.VsWORST6:
        return new PlayerDetailsGamesVsWorstFilter();
      default:
        return null;
    }
  }
}
