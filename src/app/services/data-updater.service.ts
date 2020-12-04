import { Injectable } from '@angular/core';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStoreService } from 'src/app/store/teams/teams-store.service';

@Injectable({ providedIn: 'root' })
export class DataUpdatedService {
  constructor(
    private playersStore: PlayersStore,
    private filtersService: FiltersStoreService,
    private propertiesService: PropertiesService,
    private schedulesStoreService: TeamsStoreService
  ) {}

  public update(): void {
    this.playersStore.update(this.filtersService.getCurrentState().position);
    this.propertiesService.update();
    this.schedulesStoreService.update();
  }
}
