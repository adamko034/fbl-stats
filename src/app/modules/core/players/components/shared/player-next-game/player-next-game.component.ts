import { Component, Input } from '@angular/core';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';

@Component({
  selector: 'app-player-next-game',
  templateUrl: './player-next-game.component.html',
  styleUrls: ['./player-next-game.component.scss']
})
export class PlayerNextGameComponent {
  @Input() nextGame: PlayerNextGame;
  @Input() height: number;
  @Input() bold = false;
  @Input() fontSize = 0;
  @Input() venueLong = false;

  constructor() {}
}
