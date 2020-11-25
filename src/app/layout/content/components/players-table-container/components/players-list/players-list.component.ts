import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() players: PlayerUi[];

  constructor() {}

  public trackPlayersBy(index, player: PlayerUi): string {
    return player.id;
  }
}
