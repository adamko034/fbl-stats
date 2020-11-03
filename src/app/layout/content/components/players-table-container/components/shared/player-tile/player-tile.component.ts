import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';

@Component({
  selector: 'app-player-tile',
  templateUrl: './player-tile.component.html',
  styleUrls: ['./player-tile.component.scss']
})
export class PlayerTileComponent {
  @Input() player: PlayerUi;

  constructor(private playersDataService: PlayersDataService) {}

  public getScoreColor(score: number): string {
    return `points-${this.playersDataService.getPointsColor(score)}`;
  }
}
