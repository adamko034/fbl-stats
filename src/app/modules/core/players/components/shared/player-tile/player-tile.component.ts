import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { ExpandedPlayersService } from 'src/app/modules/core/players/services/expanded-players.service';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-tile',
  templateUrl: './player-tile.component.html',
  styleUrls: ['./player-tile.component.scss'],
  providers: [ExpandedPlayersService],
  animations: [
    trigger('detailExpanded', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('0.3s ease-in', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('0.3s ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class PlayerTileComponent implements OnInit {
  @Input() player: PlayerUi;
  @Input() showAddToMyTeamButton: boolean;
  @Input() showRemoveFromMyTeamButton: boolean;

  public expanded$: Observable<boolean>;
  public isMobile$: Observable<boolean>;
  public myTeamPlayers$: Observable<string[]>;

  constructor(
    private myTeamService: MyTeamStore,
    private expandedPlayersService: ExpandedPlayersService,
    private screenSizeService: ScreenSizeService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('player tile component, ' + this.player.name + ', on init');
    this.expanded$ = this.expandedPlayersService.selectPlayerExpanded(this.player.id).pipe(distinctUntilChanged());
    this.isMobile$ = this.screenSizeService.isMobile$();
    this.myTeamPlayers$ = this.myTeamService.selectPlayersId();
  }

  public onShowPlayerDetails(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }

  public addToMyTeam(playerId: string) {
    this.myTeamService.add(playerId);
  }

  public removeFromMyTeam(playerId: string) {
    this.myTeamService.remove(playerId);
  }
}
