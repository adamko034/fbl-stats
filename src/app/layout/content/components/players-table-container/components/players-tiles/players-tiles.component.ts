import { Component, Input, OnInit } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';

@Component({
  selector: 'app-players-tiles',
  templateUrl: './players-tiles.component.html',
  styleUrls: ['./players-tiles.component.scss']
})
export class PlayersTilesComponent implements OnInit {
  @Input() players: PlayerUi[] = [];

  constructor() {}

  ngOnInit(): void {}
}
