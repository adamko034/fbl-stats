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
  selector: 'app-home-top-players-efficiency10',
  templateUrl: './home-top-players-efficiency10.component.html',
  styleUrls: ['./home-top-players-efficiency10.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopPlayersEfficiency10Component implements OnInit {
  @Input() set players(value: Player[]) {
    this._players$.next(value);
  }

  private _players$: BehaviorSubject<Player[]> = new BehaviorSubject([]);

  public cardConfig: PlayersTableCardConfig = {
    title: 'Best 10 points efficiency',
    showPositionSwitch: true,
    showTotalPoints: true,
    showPopularity: false,
    showPrice: true,
    showTop100Popularity: false,
    showAvgPoints: false,
    showTop500Popularity: false,
    showMoreText: 'Show more >>',
    customColumns: [
      { order: 3, bold: false, header: 'Avg', fieldName: 'avgMoreThan10Pts' },
      { order: 4, bold: true, header: 'Eff %', fieldName: 'effText' }
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
            const gamesDoubleDigit = new ArrayStream(player.games)
              .filterQuick((game) => game.hasPlayed && game.points >= 10)
              .collect();
            const gamesPlayed = new ArrayStream(player.games).filterQuick((g) => g.hasPlayed).collect();

            const gamesDoubleDigitPoints = new ArrayStream(gamesDoubleDigit).sumBy((g) => g.points);

            cardPlayer.eff = MathHelper.divideAndRoundPercentage(gamesDoubleDigit.length, gamesPlayed.length);
            cardPlayer.avgMoreThan10Pts = MathHelper.divideAndRound(gamesDoubleDigitPoints, gamesDoubleDigit.length);
            cardPlayer.gpMoreThan10Pts = gamesDoubleDigit.length;
            cardPlayer.gamesPlayed = gamesPlayed.length;

            cardPlayer.effText = `${cardPlayer.eff}% (${gamesDoubleDigit.length}\\${gamesPlayed.length})`;

            return cardPlayer;
          })
          .orderByThenBy({ field: 'eff', order: 'dsc' }, { field: 'gpMoreThan10Pts', order: 'dsc' })
          .take(6)
          .collect();
      })
    );
  }

  public onPositionChange(position: Position): void {
    this.position$.next(position);
  }

  public onShowMoreClick(): void {
    const params = { orderBy: 'orderBy', position: this.position$.getValue() };
    this.router.navigate(['fantasy', 'stats', 'pointsefficiency', 'overall'], { queryParams: params });
  }
}
