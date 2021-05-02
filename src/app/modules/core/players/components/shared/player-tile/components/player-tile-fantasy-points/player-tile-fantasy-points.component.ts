import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { Game } from 'src/app/store/players/models/game.model';

@Component({
  selector: 'app-player-tile-fantasy-points',
  templateUrl: './player-tile-fantasy-points.component.html',
  styleUrls: ['./player-tile-fantasy-points.component.scss']
})
export class PlayerTileFantasyPointsComponent {
  @Input() player: PlayerUi;

  constructor(private playersDataService: PlayersDataService) {}

  public getScoreColor(score: number): string {
    return `points-${this.playersDataService.getPointsColor(score)}`;
  }

  public trackGamesBy(index, game: Game): number {
    return game.matchday;
  }
}
