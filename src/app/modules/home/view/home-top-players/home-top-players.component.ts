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
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-home-top-players',
  templateUrl: './home-top-players.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopPlayersComponent implements OnInit {
  private _players$ = new BehaviorSubject<Player[]>([]);
  @Input() set players(value: Player[]) {
    this._players$.next(value);
  }

  public cardConfig: PlayersTableCardConfig = {
    title: 'Top Players Overall',
    showMoreText: 'All top players >>',
    showPositionSwitch: true,
    showTotalPoints: false,
    showPopularity: false,
    showPrice: true,
    showAvgPoints: true,
    showTop100Popularity: false,
    showTop500Popularity: true,
    customColumns: [{ order: 1, fieldName: 'totalPoints2', header: 'Points', bold: true }]
  };

  public cardPlayers$: Observable<PlayersTableCardPlayer[]>;

  private position$ = new BehaviorSubject<Position>(Position.ALL);

  constructor(private playersTableCardPlayerConverter: PlayersTableCardPlayerConverter, private router: Router) {}

  public ngOnInit(): void {
    this.cardPlayers$ = combineLatest([this.position$, this._players$]).pipe(
      map(([position, players]) => {
        return new ArrayStream(players)
          .filterQuick((player) => position === Position.ALL || player.position === position)
          .orderByThenBy({ field: 'totalPoints', order: 'dsc' }, { field: 'price', order: 'dsc' })
          .take(6)
          .convertQuick((player) => {
            const cardPlayer = this.playersTableCardPlayerConverter.fromPlayer(player);
            cardPlayer.totalPoints2 = player.totalPoints;

            return cardPlayer;
          })
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
      .withSortBy('totalPoints', 'desc')
      .build();

    this.router.navigateByUrl(url);
  }
}
