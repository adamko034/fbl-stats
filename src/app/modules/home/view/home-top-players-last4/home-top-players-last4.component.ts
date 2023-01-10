import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersTableCardConfig } from 'src/app/common/players/components/players-table-card/models/players-table-card-config';
import { PlayersTableCardPlayer } from 'src/app/common/players/components/players-table-card/models/players-table-card-player';
import { PlayersTableCardPlayerConverter } from 'src/app/common/players/components/players-table-card/services/players-table-card-player.converter';
import { Position } from 'src/app/common/players/models/position.enum';
import { PlayersTableUrlBuilder } from 'src/app/common/players/players-table/helpers/players-table-url.builder';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-home-top-players-last4',
  templateUrl: './home-top-players-last4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopPlayersLast4Component implements OnInit {
  private _players$ = new BehaviorSubject<Player[]>([]);
  @Input() set players(value: Player[]) {
    this._players$.next(value);
  }

  public cardConfig: PlayersTableCardConfig = {
    title: 'Top Players in Last 4',
    showPositionSwitch: true,
    showTotalPoints: false,
    showPopularity: false,
    showPrice: true,
    showTop100Popularity: false,
    showAvgPoints: false,
    showTop500Popularity: true,
    showMoreText: 'All top in-form players >>',
    customColumns: [
      { order: 1, bold: false, fieldName: 'last4Avg', header: 'Avg' },
      { order: 2, bold: true, fieldName: 'last4', header: 'Points' }
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
            const last4 = new ArrayStream(player.games)
              .orderBy('matchday', 'dsc')
              .take(4)
              .sumBy((game) => game.points);

            cardPlayer.last4 = last4;
            cardPlayer.last4Avg = MathHelper.divideAndRound(last4, 4);

            return cardPlayer;
          })
          .orderByThenBy({ field: 'last4', order: 'dsc' }, { field: 'price', order: 'dsc' })
          .take(6)
          .collect();
      })
    );
  }

  public onPositionChange(position: Position): void {
    this.position$.next(position);
  }

  public onShowMoreClick(): void {
    const url = PlayersTableUrlBuilder.init()
      .withPosition(this.position$.getValue())
      .withSortBy('formPoints', 'desc')
      .build();

    this.router.navigateByUrl(url);
  }
}
