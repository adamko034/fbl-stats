import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';

@Component({
  selector: 'app-players-tiles',
  templateUrl: './players-tiles.component.html',
  styleUrls: ['./players-tiles.component.scss']
})
export class PlayersTilesComponent {
  @Input() players: PlayerUi[];

  constructor() {}
}
