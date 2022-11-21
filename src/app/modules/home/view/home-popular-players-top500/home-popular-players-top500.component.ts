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
  selector: 'app-home-popular-players-top500',
  templateUrl: './home-popular-players-top500.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePopularPlayersTop500Component implements OnInit {
  @Input() set players(value: Player[]) {
    this._players$.next(value);
  }

  private _players$: BehaviorSubject<Player[]> = new BehaviorSubject([]);
  private _position$: BehaviorSubject<Position> = new BehaviorSubject(Position.ALL);

  public cardConfig: PlayersTableCardConfig = {
    showPositionSwitch: true,
    title: 'Most Popular Players in Top 500',
    showTop100Popularity: false,
    showTop500Popularity: false,
    showPopularity: true,
    showPrice: true,
    showAvgPoints: true,
    showTotalPoints: true,
    showMoreText: 'All players >>',
    customColumns: [{ order: 1, fieldName: 'top500Popularity', bold: true, header: 'Top 500 %' }]
  };

  public playersTableCardPlayers$: Observable<PlayersTableCardPlayer[]>;

  constructor(private playersTableCardPlayerConverter: PlayersTableCardPlayerConverter, private router: Router) {}

  public ngOnInit(): void {
    this.playersTableCardPlayers$ = combineLatest([this._players$, this._position$]).pipe(
      map(([players, position]) => {
        return new ArrayStream<Player>(players)
          .filterQuick((player) => position === Position.ALL || position === player.position)
          .orderByThenBy(
            { field: 'top500Popularity', order: 'dsc' },
            { field: 'totalPoints', order: 'dsc' },
            { field: 'price', order: 'dsc' }
          )
          .take(6)
          .convertQuick((player) => {
            const cardPlayer = this.playersTableCardPlayerConverter.fromPlayer(player);
            return cardPlayer;
          })
          .collect();
      })
    );
  }

  public onPositionChange(position: Position): void {
    this._position$.next(position);
  }

  public onShowMoreClick(): void {
    const url = PlayersTableUrlBuilder.init()
      .withPosition(this._position$.getValue())
      .withSortBy('top500Popularity', 'desc')
      .build();

    this.router.navigateByUrl(url);
  }
}
