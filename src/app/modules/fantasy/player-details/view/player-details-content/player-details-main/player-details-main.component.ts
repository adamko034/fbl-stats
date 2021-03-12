import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PlayerPosition } from 'src/app/modules/fantasy/players/models/players-filters';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-main',
  templateUrl: './player-details-main.component.html',
  styleUrls: ['./player-details-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsMainComponent {
  @Input() player: PlayerDetails;

  constructor() {}

  public getPositionLong(position: string): string {
    switch (position) {
      case PlayerPosition.DEF:
        return 'defender';
      case PlayerPosition.MID:
        return 'midfielder';
      case PlayerPosition.FOR:
        return 'forward';
      default:
        return 'goalkeeper';
    }
  }
}
