import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { PlayerDetailsGamesFilters } from '../../../../filters/player-details-games.filters';
import { PlayerDetailsGameFilter } from '../../../../models/enums/player-details-game-filter.enum';
import { PlayerDetailsGame } from '../../../../models/player-details-game.model';
import { PlayerDetails } from '../../../../models/player-details.model';

@Component({
  selector: 'app-player-details-points-by-venue',
  templateUrl: './player-details-points-by-venue.component.html',
  styleUrls: ['./player-details-points-by-venue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsPointsByVenueComponent {
  @Input() player: PlayerDetails;

  public get homeGames(): PlayerDetailsGame[] {
    return new ArrayStream(this.player.games)
      .filter(new PlayerDetailsGamesFilters(PlayerDetailsGameFilter.HOME))
      .collect();
  }

  public get awayGames(): PlayerDetailsGame[] {
    return new ArrayStream(this.player.games)
      .filter(new PlayerDetailsGamesFilters(PlayerDetailsGameFilter.AWAY))
      .collect();
  }

  constructor() {}

  public calculatePointsPer1M(points: number): number {
    return Math.round((points / this.player.fantasy.price) * 10) / 10;
  }
}
