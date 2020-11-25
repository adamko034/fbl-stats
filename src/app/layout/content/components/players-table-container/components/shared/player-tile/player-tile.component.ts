import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-tile',
  templateUrl: './player-tile.component.html',
  styleUrls: ['./player-tile.component.scss'],
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

  public expanded$: Observable<boolean>;
  public isMobile = false;

  constructor(private expandedPlayersService: ExpandedPlayersService) {}

  public ngOnInit(): void {
    Logger.logDev('player tile component, ' + this.player.name + ', on init');
    this.expanded$ = this.expandedPlayersService.selectPlayerExpanded(this.player.id).pipe(distinctUntilChanged());
    this.isMobile = window.innerWidth < 500;
  }

  public onShowPlayerDetails(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }
}
