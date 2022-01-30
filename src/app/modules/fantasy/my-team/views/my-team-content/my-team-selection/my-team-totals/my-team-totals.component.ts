import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-team-totals',
  templateUrl: './my-team-totals.component.html',
  styleUrls: ['./my-team-totals.component.scss']
})
export class MyTeamTotalsComponent {
  @Input() players: Player[];

  constructor() {}
}
