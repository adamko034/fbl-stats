import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersTableCardConfig } from 'src/app/common/players/components/players-table-card/models/players-table-card-config';
import { PlayersTableCardPlayer } from 'src/app/common/players/components/players-table-card/models/players-table-card-player';
import { PlayersTableCardPlayerConverter } from 'src/app/common/players/components/players-table-card/services/players-table-card-player.converter';
import { Position } from 'src/app/common/players/models/position.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-home-top-players-home',
  templateUrl: './home-top-players-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopPlayersHomeComponent implements OnInit {
  @Input() set players(value: Player[]) {
    this._players$.next(value);
  }

  private _players$: BehaviorSubject<Player[]> = new BehaviorSubject([]);

  public cardConfig: PlayersTableCardConfig = {
    title: 'Top Players at home games',
    showPositionSwitch: true,
    showTotalPoints: true,
    showPopularity: false,
    showPrice: true,
    showTop100Popularity: false,
    showAvgPoints: false,
    showTop500Popularity: false,
    showMoreText: 'Show more >>',
    customColumns: [
      { order: 1, bold: false, fieldName: 'gpAtHome', header: 'GP H' },
      { order: 2, bold: false, fieldName: 'avgAtHome', header: 'Avg H' },
      { order: 3, bold: true, fieldName: 'pointsAtHome', header: 'Points' }
    ]
  };

  public cardPlayers$: Observable<PlayersTableCardPlayer[]>;

  private position$ = new BehaviorSubject<Position>(Position.ALL);

  constructor(private playersTableCardPlayerConverter: PlayersTableCardPlayerConverter, private router: Router) {}

  ngOnInit(): void {
    this.cardPlayers$ = combineLatest([this.position$, this._players$]).pipe(
      map(([position, players]) => {
        return new ArrayStream(players)
          .filterQuick((player) => position === Position.ALL || player.position === position)
          .convertQuick((player) => {
            const cardPlayer = this.playersTableCardPlayerConverter.fromPlayer(player);
            const homeGames = new ArrayStream(player.games).filterQuick((game) => game.isHome).collect();
            const homePoints = new ArrayStream(player.games)
              .filterQuick((game) => game.isHome)
              .sumBy((game) => game.points);

            cardPlayer.pointsAtHome = homePoints;
            cardPlayer.avgAtHome = MathHelper.divideAndRound(homePoints, homeGames.length);
            cardPlayer.gpAtHome = homeGames.length;

            return cardPlayer;
          })
          .orderByThenBy({ field: 'pointsAtHome', order: 'dsc' }, { field: 'totalPoints', order: 'dsc' })
          .take(6)
          .collect();
      })
    );
  }

  public onPositionChange(position: Position): void {
    this.position$.next(position);
  }

  public onShowMoreClick(): void {
    const params = { type: 'avgHome', pos: this.position$.getValue() };
    this.router.navigate(['fantasy', 'stats', 'avgpoints'], { queryParams: params });
  }
}
