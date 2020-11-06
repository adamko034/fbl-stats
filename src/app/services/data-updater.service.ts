import { Injectable } from '@angular/core';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { StoreService } from 'src/app/services/store.service';

@Injectable({ providedIn: 'root' })
export class DataUpdatedService {
  constructor(
    private storeService: StoreService,
    private filtersService: FiltersStoreService,
    private propertiesService: PropertiesService
  ) {}

  public update(): void {
    this.storeService.update(this.filtersService.getCurrentState().position);
    this.propertiesService.update();
  }
}
