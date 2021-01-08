import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStoreFileService } from 'src/app/store/teams/teams-store-file.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class CoreDataLoadedGuard implements CanActivate {
  constructor(
    private propertiesService: PropertiesService,
    private playersStore: PlayersStore,
    private teamsStore: TeamsStoreFileService
  ) {}

  public canActivate(): Observable<boolean> {
    return combineLatest([
      this.propertiesService.selectPlayerMaxPrice(),
      this.propertiesService.selectLastMatchday(),
      this.playersStore.selectPlayers(),
      this.teamsStore.select()
    ]).pipe(
      tap(() => Logger.logDev('core data loaded guard, waiting for data')),
      filter(([maxPrice, lastMachday, players, teams]) => {
        return (
          !!maxPrice &&
          maxPrice > 0 &&
          !!lastMachday &&
          lastMachday > 0 &&
          !!players &&
          players.players.length > 0 &&
          !!teams &&
          teams.length > 0
        );
      }),
      tap(() => Logger.logDev('core data resolver, got all data')),
      mapTo(true)
    );
  }
}
