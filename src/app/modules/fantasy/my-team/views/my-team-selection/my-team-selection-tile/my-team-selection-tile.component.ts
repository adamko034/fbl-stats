import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/common/players/models/position.enum';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Player } from 'src/app/store/players/models/player.model';
import { MyTeamTilesDisplaySettings } from '../../../models/my-team-tiles-display-settings.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-team-selection-tile',
  templateUrl: './my-team-selection-tile.component.html',
  styleUrls: ['./my-team-selection-tile.component.scss']
})
export class MyTeamSelectionTileComponent {
  @Input() position: Position;
  @Input() players: Player[];
  @Input() displaySettings: MyTeamTilesDisplaySettings;

  public orderBy$: Observable<string>;

  public get title(): string {
    switch (this.position) {
      case Position.DEF:
        return 'Defenders';
      case Position.MID:
        return 'Midfielders';
      case Position.FOR:
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
