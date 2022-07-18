import { Injectable } from '@angular/core';
import { Position } from 'src/app/common/players/models/position.enum';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { MatchdayTipsOurPicksFilters } from '../models/matchday-tips-our-picks-filters.model';
import { MatchdayTipsOurPicksPositionFilter } from './matchday-tips-our-picks-position.filter';
import { MatchdayTipsOurPicksTypesFilter } from './matchday-tips-our-picks-types.filters';

@Injectable()
export class MatchdayTipsOurPicksFiltersExecutor {
  public filter(
    players: MatchdayTipsOurPicksPlayer[],
    filters: MatchdayTipsOurPicksFilters
  ): MatchdayTipsOurPicksPlayer[] {
    const filterables: Filterable<MatchdayTipsOurPicksPlayer>[] = [];

    if (!!filters.position && filters.position != Position.ALL) {
      filterables.push(new MatchdayTipsOurPicksPositionFilter(filters.position));
    }

    if (!!filters.types) {
      filterables.push(new MatchdayTipsOurPicksTypesFilter(filters.types));
    }

    filterables.forEach((filterable) => (players = filterable.filter(players)));

    return players;
  }
}
