import { Component } from '@angular/core';
import { PlayerPosition } from 'src/app/layout/content/models/players-filters';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersStore } from 'src/app/store/players/players.store';

@Component({
  selector: 'app-select-position',
  templateUrl: './select-position.component.html',
  styleUrls: ['./select-position.component.scss']
})
export class SelectPositionComponent {
  public PlayerPosition = PlayerPosition;
  public selected: PlayerPosition;

  constructor(private filtersStoreServie: FiltersStoreService, private playersStore: PlayersStore) {}

  public onPositionChange(position: PlayerPosition) {
    this.selected = position;
    this.playersStore.loadByPosition(position);
    this.filtersStoreServie.updatePosition(position);
  }
}
