import { Component } from '@angular/core';
import { PlayerPosition } from 'src/app/layout/content/models/players-filters';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-select-position',
  templateUrl: './select-position.component.html',
  styleUrls: ['./select-position.component.scss']
})
export class SelectPositionComponent {
  public PlayerPosition = PlayerPosition;
  public selected: PlayerPosition;

  constructor(private filtersStoreServie: FiltersStoreService, private storeService: StoreService) {}

  public onPositionChange(position: PlayerPosition) {
    this.selected = position;
    this.storeService.loadByPosition(position);
    this.filtersStoreServie.updatePosition(position);
  }
}
