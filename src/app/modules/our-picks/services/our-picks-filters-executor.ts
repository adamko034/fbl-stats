import { Injectable } from '@angular/core';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { OurPicksFilters } from '../models/our-picks-filters.model';
import { OurPicksPlayer } from '../../core/our-picks/models/our-picks-player.model';
import { OurPicksPositionFilter } from './filters/our-picks-position.filter';
import { OurPicksTypesFilter } from './filters/our-picks-types.filters';

@Injectable()
export class OurPicksFiltersExecutor {
  public filter(players: OurPicksPlayer[], filters: OurPicksFilters): OurPicksPlayer[] {
    const filterables: Filterable<OurPicksPlayer>[] = [];

    if (!!filters.position && filters.position != PlayerPosition.ALL) {
      filterables.push(new OurPicksPositionFilter(filters.position));
    }

    if (!!filters.types) {
      filterables.push(new OurPicksTypesFilter(filters.types));
    }

    filterables.forEach((filterable) => (players = filterable.filter(players)));

    return players;
  }
}
