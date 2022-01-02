import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';
import { MatchdayTipsTopTeamFilters } from '../models/matchday-tips-top-team-filters.model';
import { MatchdayTipsTopTeamState } from '../models/matchday-tips-top-team-state.model';
import { MatchdayTipsTopTeamType } from '../models/matchday-tips-top-team-type.enum';
import { MatchdayTipsTopTeamSelector } from './matchday-tips-top-team-selector.service';

@Injectable()
export class MatchdayTipsTopTeamResolver implements Resolve<Observable<MatchdayTipsTopTeamState>> {
  constructor(
    private playersStore: PlayersStore,
    private propertiesStore: PropertiesStore,
    private topTeamSelector: MatchdayTipsTopTeamSelector
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<MatchdayTipsTopTeamState> {
    Logger.logDev('matchday tips top team resolver, resolving...');

    return combineLatest([
      this.playersStore.selectPlayers(),
      this.propertiesStore.selectPlayerMaxPrice(),
      this.propertiesStore.selectLastMatchday()
    ]).pipe(
      map(([players, maxPrice, lastMatchday]) => {
        const filters = this.getFilters(route.queryParams, maxPrice);
        Logger.logDev(`matchday tips top team resolver, resolving with filters: ${JSON.stringify(filters)}`);

        const playersFiltered = this.filterPlayers(players, filters);
        const team = this.topTeamSelector.select(playersFiltered, filters.calculation);

        return { team, filters, maxPrice, lastMatchday };
      }),
      first()
    );
  }

  private getFilters(params: Params, maxPrice: number): MatchdayTipsTopTeamFilters {
    return {
      calculation: params.type ?? MatchdayTipsTopTeamType.OVERALL,
      popularity: params.popularity ?? 100,
      price: params.price ?? maxPrice,
      top500Popularity: params.top500 ?? 100
    };
  }

  private filterPlayers(players: Player[], filters: MatchdayTipsTopTeamFilters): Player[] {
    return players
      .filter((p) => p.price <= filters.price)
      .filter((p) => p.popularity <= filters.popularity)
      .filter((p) => p.top500Popularity <= filters.top500Popularity);
  }
}
