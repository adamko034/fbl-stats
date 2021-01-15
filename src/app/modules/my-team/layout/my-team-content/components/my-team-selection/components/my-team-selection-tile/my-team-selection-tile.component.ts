import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamTilesDisplaySettingsService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-tiles-display-settings.service';
import { MyTeamPlayer } from 'src/app/modules/my-team/models/my-team-player.model';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-team-selection-tile',
  templateUrl: './my-team-selection-tile.component.html',
  styleUrls: ['./my-team-selection-tile.component.scss']
})
export class MyTeamSelectionTileComponent implements OnInit {
  @Input() position: PlayerPosition;
  @Input() players: MyTeamPlayer[];

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

  constructor(private myTeamService: MyTeamStore, private myTeamTileOrderService: MyTeamTilesDisplaySettingsService) {}

  public ngOnInit(): void {
    this.orderBy$ = this.myTeamTileOrderService.selectTileOrder();
  }

  public onPlayerRemove(id: string): void {
    this.myTeamService.remove(id);
  }
}
