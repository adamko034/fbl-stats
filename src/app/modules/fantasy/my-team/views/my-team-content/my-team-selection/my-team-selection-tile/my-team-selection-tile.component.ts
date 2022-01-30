import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Player } from 'src/app/store/players/models/player.model';
import { MyTeamTilesDisplaySettings } from '../../../../models/my-team-tiles-display-settings.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-team-selection-tile',
  templateUrl: './my-team-selection-tile.component.html',
  styleUrls: ['./my-team-selection-tile.component.scss']
})
export class MyTeamSelectionTileComponent {
  @Input() position: PlayerPosition;
  @Input() players: Player[];
  @Input() displaySettings: MyTeamTilesDisplaySettings;

  public orderBy$: Observable<string>;

  public get title(): string {
    switch (this.position) {
      case PlayerPosition.DEF:
        return 'Defenders';
      case PlayerPosition.MID:
        return 'Midfielders';
      case PlayerPosition.FOR:
        return 'Forwards';
      default:
        return 'Goalkeepers';
    }
  }

  constructor(private myTeamService: MyTeamStore) {}

  public onPlayerRemove(id: string): void {
    this.myTeamService.remove(id);
  }
}
