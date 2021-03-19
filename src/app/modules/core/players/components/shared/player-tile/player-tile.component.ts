import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-tile',
  templateUrl: './player-tile.component.html',
  styleUrls: ['./player-tile.component.scss']
})
export class PlayerTileComponent implements OnInit {
  @Input() player: PlayerUi;
  @Input() showAddToMyTeamButton: boolean;
  @Input() showRemoveFromMyTeamButton: boolean;

  public isMobile$: Observable<boolean>;
  public myTeamPlayers$: Observable<string[]>;

  constructor(private myTeamService: MyTeamStore, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    Logger.logDev('player tile component, ' + this.player.name + ', on init');
    this.isMobile$ = this.screenSizeService.isMobile$();
    this.myTeamPlayers$ = this.myTeamService.selectPlayersId();
  }

  public addToMyTeam(playerId: string) {
    this.myTeamService.add(playerId);
  }

  public removeFromMyTeam(playerId: string) {
    this.myTeamService.remove(playerId);
  }
}
