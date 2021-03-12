import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-matchdays',
  templateUrl: './player-details-matchdays.component.html',
  styleUrls: ['./player-details-matchdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsMatchdaysComponent {
  @Input() player: PlayerDetails;

  constructor() {}
}
