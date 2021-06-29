import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-points',
  templateUrl: './player-details-points.component.html',
  styleUrls: ['./player-details-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsPointsComponent implements OnInit {
  @Input() player: PlayerDetails;

  constructor() {}

  public ngOnInit(): void {}
}
