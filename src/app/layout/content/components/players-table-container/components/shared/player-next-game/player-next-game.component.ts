import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-player-next-game',
  templateUrl: './player-next-game.component.html',
  styleUrls: ['./player-next-game.component.scss']
})
export class PlayerNextGameComponent {
  @Input() player: Player;
  @Input() height: number;

  constructor() {}
}
