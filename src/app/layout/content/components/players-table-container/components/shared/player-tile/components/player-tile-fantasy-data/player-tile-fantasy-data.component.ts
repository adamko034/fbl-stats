import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';

@Component({
  selector: 'app-player-tile-fantasy-data',
  templateUrl: './player-tile-fantasy-data.component.html',
  styleUrls: ['./player-tile-fantasy-data.component.scss']
})
export class PlayerTileFantasyDataComponent {
  @Input() player: PlayerUi;

  constructor() {}
}
