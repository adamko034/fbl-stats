import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { HomePlayersGoalsAssistsPlayer } from './home-players-goals-assists-player.model';

@Component({
  selector: 'app-home-players-goals-assists',
  templateUrl: './home-players-goals-assists.component.html',
  styleUrls: ['./home-players-goals-assists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlayersGoalsAssistsComponent {
  @Input() set players(value: Player[]) {
    const homePlayers = this.convertPlayers(value);
    this._playersGoals = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'goals', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();

    this._playersAssists = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'assists', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();
  }

  private _playersGoals: HomePlayersGoalsAssistsPlayer[];
  public get playersGoals(): HomePlayersGoalsAssistsPlayer[] {
    return this._playersGoals;
  }
  private _playersAssists: HomePlayersGoalsAssistsPlayer[];
  public get playersAssists(): HomePlayersGoalsAssistsPlayer[] {
    return this._playersAssists;
  }

  constructor(private predictionDeterminer: PlayerPredictionCombinedDeterminer, private router: Router) {}

  public onShowMoreClick(type: string) {
    if (type === 'goals') {
      this.router.navigate(['fantasy', 'stats', 'points'], {
        queryParams: { type: 'bundesliga', calc: 'overall', sortBy: 'G' }
      });
    }

    if (type === 'assists') {
      this.router.navigate(['fantasy', 'stats', 'points'], {
        queryParams: { type: 'bundesliga', calc: 'overall', sortBy: 'A' }
      });
    }
  }

  private convertPlayers(players: Player[]): HomePlayersGoalsAssistsPlayer[] {
    return new ArrayStream(players).convertQuick((p) => this.convertSinglePlayer(p)).collect();
  }

  private convertSinglePlayer(player: Player): HomePlayersGoalsAssistsPlayer {
    const {
      id,
      lastName,
      teamShort,
      isReturning,
      attendance,
      price,
      top500Popularity,
      games,
      totalPoints,
      position,
      nextGame
    } = player;
    const assists = new ArrayStream(games).sumBy((g) => g.assists);
    const goals = new ArrayStream(games).sumBy((g) => g.goals);

    return {
      id,
      name: lastName,
      teamShort,
      isReturning,
      isUnavailable: attendance === 0,
      price,
      top500Popularity,
      assists,
      goals,
      totalPoints,
      position,
      prediction: this.predictionDeterminer.determine(nextGame)
    };
  }
}
