import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { PlayerDetailsGameTextValueConverter } from '../../../../converters/player-details-game-text-value.converter';
import { PlayerDetailsGame } from '../../../../models/player-details-game.model';
import { PlayerDetails } from '../../../../models/player-details.model';

@Component({
  selector: 'app-player-details-top-games',
  templateUrl: './player-details-top-games.component.html',
  styleUrls: ['./player-details-top-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsTopGamesComponent {
  @Input() player: PlayerDetails;

  public get bestGames(): TextValue[] {
    return new ArrayStream<PlayerDetailsGame>(this.player.games)
      .filterQuick((g) => g.wasPlayed && g.playerWasAvailable)
      .orderBy('points', 'dsc')
      .take(5)
      .convert(new PlayerDetailsGameTextValueConverter(this.playersDataservice))
      .collect();
  }

  public get worstGames(): TextValue[] {
    return new ArrayStream<PlayerDetailsGame>(this.player.games)
      .filterQuick((g) => g.wasPlayed && g.playerWasAvailable)
      .orderBy('points', 'asc')
      .take(5)
      .convert(new PlayerDetailsGameTextValueConverter(this.playersDataservice))
      .collect();
  }

  constructor(private playersDataservice: PlayersDataService) {}
}
