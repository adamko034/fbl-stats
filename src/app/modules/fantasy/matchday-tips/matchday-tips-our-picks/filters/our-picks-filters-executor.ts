import { Injectable } from '@angular/core';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { OurPicksFilters } from '../models/our-picks-filters.model';
import { OurPicksPositionFilter } from './our-picks-position.filter';
import { OurPicksTypesFilter } from './our-picks-types.filters';

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
