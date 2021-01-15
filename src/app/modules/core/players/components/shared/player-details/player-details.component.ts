import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ExpandedPlayersService } from 'src/app/modules/core/players/services/expanded-players.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  @Input() player: Player;

  constructor(private expandedPlayersService: ExpandedPlayersService) {}

  public ngOnInit(): void {
    Logger.logDev('player details component, ' + this.player.name + ', on init');
  }

  public onDetailsCollapse(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }
}
