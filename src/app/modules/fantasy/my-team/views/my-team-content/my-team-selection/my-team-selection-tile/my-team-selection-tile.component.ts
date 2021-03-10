import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPosition } from 'src/app/modules/fantasy/players/models/players-filters';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MyTeamPlayer } from '../../../../models/my-team-player.model';
import { MyTeamTilesDisplaySettingsService } from '../../../../services/my-team-tiles-display-settings.service';

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
