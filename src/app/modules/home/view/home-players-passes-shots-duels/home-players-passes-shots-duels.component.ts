import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { HomePlayerPassesShotsDuels } from './home-player-passes-shots-duels.model';

@Component({
  selector: 'app-home-players-passes-shots-duels',
  templateUrl: './home-players-passes-shots-duels.component.html',
  styleUrls: ['./home-players-passes-shots-duels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlayersPassesShotsDuelsComponent implements OnInit {
  @Input() set players(value: Player[]) {
    const homePlayers = this.convertPlayers(value);

    this._playersShots = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'shots', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();

    this._playersPasses = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'passes', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();

    this._playersDuels = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'duels', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();

    this._playersShotsSaved = new ArrayStream(homePlayers)
      .orderByThenBy(
        { field: 'shotsSaved', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'asc' }
      )
      .take(6)
      .collect();
  }

  private _playersShots: HomePlayerPassesShotsDuels[];
  public get playersShots(): HomePlayerPassesShotsDuels[] {
    return this._playersShots;
  }

  private _playersPasses: HomePlayerPassesShotsDuels[];
  public get playersPasses(): HomePlayerPassesShotsDuels[] {
    return this._playersPasses;
  }

  private _playersDuels: HomePlayerPassesShotsDuels[];
  public get playersDuels(): HomePlayerPassesShotsDuels[] {
    return this._playersDuels;
  }

  private _playersShotsSaved: HomePlayerPassesShotsDuels[];
  public get playersShotsSaved(): HomePlayerPassesShotsDuels[] {
    return this._playersShotsSaved;
  }

  constructor(private predictionDeterimer: PlayerPredictionCombinedDeterminer, private router: Router) {}

  ngOnInit(): void {}

  public onShowMoreClick(type: string) {
    //localhost:4200/fantasy/stats/points?type=fantasy&calc=overall&sortBy=Sh&sortOrder=desc

    if (type === 'shots') {
      const params = { type: 'fantasy', calc: 'overall', sortBy: 'Sh', sortOrder: 'desc' };
      this.router.navigate(['fantasy', 'stats', 'points'], { queryParams: params });
    }

    if (type === 'passes') {
      const params = { type: 'fantasy', calc: 'overall', sortBy: 'PtS', sortOrder: 'desc' };
      this.router.navigate(['fantasy', 'stats', 'points'], { queryParams: params });
    }

    if (type === 'duels') {
      const params = { type: 'fantasy', calc: 'overall', sortBy: 'WD', sortOrder: 'desc', sub: 'defensive' };
      this.router.navigate(['fantasy', 'stats', 'points'], { queryParams: params });
    }

    if (type === 'shotsSaved') {
      const params = { type: 'fantasy', calc: 'overall', sortBy: 'ShS', sortOrder: 'desc', sub: 'defensive' };
      this.router.navigate(['fantasy', 'stats', 'points'], { queryParams: params });
    }
  }

  private convertPlayers(players: Player[]): HomePlayerPassesShotsDuels[] {
    return players.map((player) => this.convertPlayer(player));
  }

  private convertPlayer(player: Player): HomePlayerPassesShotsDuels {
    return {
      id: player.id,
      name: player.lastName,
      duels: player.pointsStats.overall.wonDuels,
      isReturning: player.isReturning,
      isUnavailable: player.attendance === 0,
      passes: player.pointsStats.overall.passesToShot,
      position: player.position,
      prediction: this.predictionDeterimer.determine(player.nextGame),
      price: player.price,
      shots: player.pointsStats.overall.shotsOnGoal,
      teamShort: player.teamShort,
      top500Popularity: player.top500Popularity,
      totalPoints: player.totalPoints,
      shotsSaved: player.pointsStats.overall.shotsSaved
    };
  }
}
