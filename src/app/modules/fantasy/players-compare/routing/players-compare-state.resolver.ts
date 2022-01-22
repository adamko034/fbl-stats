import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, withLatestFrom } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareState } from '../models/players-compare-state.model';
import { PlayersCompareIdsCacheService } from '../services/players-compare-ids-store.service';

@Injectable()
export class PlayersCompareStateResolver implements Resolve<Observable<PlayersCompareState>> {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private propertiesStore: PropertiesStore,
    private idsCache: PlayersCompareIdsCacheService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayersCompareState> {
    var ids = route.queryParamMap.getAll('ids');

    Logger.logDev(`players compare state resolver, resolving ids: ${ids.join(',')}`);

    return this.playersStore.selectByIds(ids).pipe(
      withLatestFrom(
        this.teamsStore.selectState(),
        this.propertiesStore.selectLastMatchday(),
        this.propertiesStore.selectPlayerMaxPrice()
      ),
      map(([players, teamsState, lastMatchday, maxPrice]) => {
        const ordered: Player[] = [];

        ids.forEach((id) => {
          var player = players.find((p) => p.id.toString() === id);
          if (player) {
            ordered.push(player);
          }
        });

        const teamsShortName = new ArrayStream<Player>(players).distinct((p) => p.teamShort);
        const teams: { [teamShort: string]: Team } = {};

        teamsShortName.forEach((teamShort) => {
          teams[teamShort] = teamsState[teamShort];
        });

        if (route.queryParams.fromQuickLink !== 'true') {
          this.cachePlayersIds(ordered, ids);
        }

        return { players: ordered, teams, lastMatchday, maxPrice };
      }),
      first()
    );
  }

  private cachePlayersIds(players: Player[], ids: string[]): void {
    if (players.length !== ids.length) {
      Logger.logDev('players compare state resolver, loaded different ids than provided from url, caching');
      this.idsCache.set(players.map((p) => p.id.toString()));
    }
  }
}
