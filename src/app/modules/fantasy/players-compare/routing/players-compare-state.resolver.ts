import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap, withLatestFrom } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareState } from '../models/players-compare-state.model';

@Injectable()
export class PlayersCompareStateResolver implements Resolve<Observable<PlayersCompareState>> {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private propertiesStore: PropertiesStore
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayersCompareState> {
    var ids = route.queryParamMap.getAll('ids');

    Logger.logDev(`players compare state resolver, resolving ids: ${ids.join(',')}`);

    return this.playersStore.selectByIds(ids).pipe(
      withLatestFrom(this.teamsStore.selectState(), this.propertiesStore.selectLastMatchday()),
      map(([players, teamsState, lastMatchday]) => {
        players = new ArrayStream<Player>(players).orderBy('id', 'asc').collect();

        const teamsShortName = new ArrayStream<Player>(players).distinct((p) => p.teamShort);
        const teams: { [teamShort: string]: Team } = {};

        teamsShortName.forEach((teamShort) => {
          teams[teamShort] = teamsState[teamShort];
        });
        return { players, teams, lastMatchday };
      }),
      first(),
      tap((state) => console.log(state))
    );
  }
}
