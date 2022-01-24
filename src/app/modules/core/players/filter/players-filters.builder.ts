import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { Player } from 'src/app/store/players/models/player.model';
import { Filterable } from '../../shared/filterable/filterable';
import { PlayersFilterExcludedIds } from './filters/players-filter-excluded-ids';
import { PlayersFilterName } from './filters/players-filter-name';
import { PlayersFilterPosition } from './filters/players-filter-position';

export class PlayersFiltersBuilder {
  private _filters: { order: number; filter: Filterable<Player> }[];
  private _order: number;

  private constructor() {
    this._filters = [];
    this._order = 1;
  }

  public static instance(): PlayersFiltersBuilder {
    return new PlayersFiltersBuilder();
  }

  public withPosition(position: PlayerPosition): PlayersFiltersBuilder {
    this.pushFilter(new PlayersFilterPosition(position));
    return this;
  }

  public withName(name: string): PlayersFiltersBuilder {
    this.pushFilter(new PlayersFilterName(name));
    return this;
  }

  public withExcludedIds(excludedIds: string[]): PlayersFiltersBuilder {
    this.pushFilter(new PlayersFilterExcludedIds(excludedIds));
    return this;
  }

  public build(): { order: number; filter: Filterable<Player> }[] {
    return this._filters;
  }

  private pushFilter(filter: Filterable<Player>) {
    this._filters.push({ order: this._order++, filter });
  }
}
