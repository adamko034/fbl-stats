import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class CoreDataLoadedGuard implements CanActivate {
  constructor(
    private propertiesStore: PropertiesStore,
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore
  ) {}

  public canActivate(): Observable<boolean> {
    return combineLatest([
      this.propertiesStore.selectPlayerMaxPrice(),
      this.propertiesStore.selectLastMatchday(),
      this.playersStore.selectPlayers(),
      this.teamsStore.selectAll()
    ]).pipe(
      tap(() => Logger.logDev('core data loaded guard, waiting for data')),
      filter(([maxPrice, lastMachday, players, teams]) => {
        return (
          !!maxPrice &&
          maxPrice > 0 &&
          !!lastMachday &&
          lastMachday > 0 &&
          !!players &&
          players.length > 0 &&
          !!teams &&
          teams.length > 0 &&
          players.filter((x) => x.position.toLowerCase() === 'gk').length > 0 &&
          players.filter((x) => x.position.toLowerCase() === 'def').length > 0 &&
          players.filter((x) => x.position.toLowerCase() === 'mid').length > 0 &&
          players.filter((x) => x.position.toLowerCase() === 'for').length > 0
        );
      }),
      tap(() => Logger.logDev('core data resolver, got all data')),
      mapTo(true)
    );
  }
}
