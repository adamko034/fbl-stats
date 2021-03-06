import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';

@Component({
  selector: 'app-player-tile-next-game',
  templateUrl: './player-tile-next-game.component.html',
  styleUrls: ['./player-tile-next-game.component.scss']
})
export class PlayerTileNextGameComponent {
  @Input() player: PlayerUi;

  constructor() {}
}
