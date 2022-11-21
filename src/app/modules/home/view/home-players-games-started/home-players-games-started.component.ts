import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersTableUrlBuilder } from 'src/app/common/players/players-table/helpers/players-table-url.builder';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { HomePlayersGamesStartedPlayer } from './home-players-games-started-player.model';

@Component({
  selector: 'app-home-players-games-started',
  templateUrl: './home-players-games-started.component.html',
  styleUrls: ['./home-players-games-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlayersGamesStartedComponent {
  @Input() set players(value: Player[]) {
    const homePlayers = this.convertPlayers(value);
    this._gamesStarted = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'gamesStartedPercentage', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();

    this._games70Minutes = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'games70MinutesPercentage', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();
  }

  private _gamesStarted: HomePlayersGamesStartedPlayer[];
  public get gamesStarted(): HomePlayersGamesStartedPlayer[] {
    return this._gamesStarted;
  }
  private _games70Minutes: HomePlayersGamesStartedPlayer[];
  public get games70Minutes(): HomePlayersGamesStartedPlayer[] {
    return this._games70Minutes;
  }

  constructor(private predictionDeterminer: PlayerPredictionCombinedDeterminer, private router: Router) {}

  public onShowMoreClick(type: string) {
    const field = type === 'gs' ? 'totalGamesStarted' : 'totalGames70Min';
    const url = PlayersTableUrlBuilder.init().withSortBy(field, 'desc').build();

    this.router.navigateByUrl(url);
  }

  private convertPlayers(players: Player[]): HomePlayersGamesStartedPlayer[] {
    return new ArrayStream(players).convertQuick((p) => this.convertSinglePlayer(p)).collect();
  }

  private convertSinglePlayer(player: Player): HomePlayersGamesStartedPlayer {
    const {
      id,
      lastName,
      teamShort,
      isReturning,
      attendance,
      price,
      totalPoints,
      position,
      nextGame,
      games70MinPercentage,
      gamesStartedPercentage
    } = player;

    return {
      id,
      name: lastName,
      teamShort,
      isReturning,
      isUnavailable: attendance === 0,
      price,
      totalPoints,
      position,
      prediction: this.predictionDeterminer.determine(nextGame),
      gamesStartedPercentage: gamesStartedPercentage,
      games70MinutesPercentage: games70MinPercentage
    };
  }
}
