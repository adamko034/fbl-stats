import { Component, Input, OnInit } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';

@Component({
  selector: 'app-player-tile',
  templateUrl: './player-tile.component.html',
  styleUrls: ['./player-tile.component.scss']
})
export class PlayerTileComponent implements OnInit {
  @Input() player: PlayerUi;
  @Input() timelineOptions: TimelineDisplayOptions;

  constructor(private playersDataService: PlayersDataService, private expandedPlayersService: ExpandedPlayersService) {}

  public ngOnInit(): void {}

  public onShowPlayerDetails(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }

  public getScoreColor(score: number): string {
    return `points-${this.playersDataService.getPointsColor(score)}`;
  }
}
