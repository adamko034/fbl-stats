import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';

@Component({
  selector: 'app-player-tile-name',
  templateUrl: './player-tile-name.component.html',
  styleUrls: ['./player-tile-name.component.scss']
})
export class PlayerTileNameComponent {
  @Input() player: PlayerUi;

  constructor() {}
}
