import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() players: PlayerUi[];
  @Input() showAddToMyTeamButton: boolean;
  @Input() showRemoveFromMyTeamButton: boolean;

  constructor() {}

  public trackPlayersBy(index, player: PlayerUi): string {
    return player.id;
  }
}
