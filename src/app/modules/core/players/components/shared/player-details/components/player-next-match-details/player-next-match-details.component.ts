import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-next-match-details',
  templateUrl: './player-next-match-details.component.html',
  styleUrls: ['./player-next-match-details.component.scss']
})
export class PlayerNextMatchDetailsComponent {
  @Input() player: PlayerUi;
}
