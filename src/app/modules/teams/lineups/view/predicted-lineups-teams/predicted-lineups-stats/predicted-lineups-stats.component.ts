import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerSourceLineupPrediction } from 'src/app/common/players/models/player-source-lineup-prediction.enum';
import { PlayersFilterPrediciton } from 'src/app/common/players/models/players-filter-prediction.enum';
import { PlayersFilterAvailbility } from 'src/app/modules/core/players/filter/filters/players-filter-availability';
import { PlayersFilterNextGameNotPostponed } from 'src/app/modules/core/players/filter/filters/players-filter-next-game-not-postopned';
import { PlayersFilterPrediction } from 'src/app/modules/core/players/filter/filters/players-filter-prediction';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Player } from 'src/app/store/players/models/player.model';

interface State {
  started: Player[];
  benched: Player[];
  varied: Player[];
  unavailable: Player[];
}

@Component({
  selector: 'app-predicted-lineups-stats',
  templateUrl: './predicted-lineups-stats.component.html',
  styleUrls: ['./predicted-lineups-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsStatsComponent implements OnInit {
  private sort$ = new BehaviorSubject<{ [key: string]: { field: string; order: 'asc' | 'dsc' } }>({});

  public sortDisplay: { [key: string]: string } = {
    started: 'last 5 games',
    benched: 'last 5 games',
    unavailable: 'last 5 games',
    varied: 'last 5 games'
  };
  public screens = ScreenSize;
  public state$: Observable<State>;
  public screen$: Observable<ScreenSize>;

  constructor(private route: ActivatedRoute, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.screen$ = this.screenSizeService.onResize();
    this.state$ = combineLatest([this.sort$, this.route.data]).pipe(
      map(([sort, data]) => {
        return {
          started: this.filterPlayers(
            data.players,
            sort.started,
            new PlayersFilterPrediction(PlayersFilterPrediciton.PLAY)
          ),
          unavailable: this.filterPlayers(
            data.players,
            sort.unavailable,
            new PlayersFilterAvailbility(false),
            new PlayersFilterNextGameNotPostponed()
          ),
          benched: this.filterPlayers(
            data.players,
            sort.benched,
            new PlayersFilterAvailbility(true),
            new PlayersFilterPrediction(PlayersFilterPrediciton.BENCHED)
          ),
          varied: this.filterPlayers(
            data.players,
            sort.varied,
            new PlayersFilterAvailbility(true),
            new PlayersFilterPrediction(PlayersFilterPrediciton.VARIED)
          )
        };
      })
    );
  }

  public getPrediction(player: Player, source: string): PlayerSourceLineupPrediction {
    var predictions = player.nextGame?.lineupPredictions?.filter((l) => l.source === source);

    if (!predictions || predictions.length === 0) {
      return PlayerSourceLineupPrediction.UNKNOWN;
    }

    return predictions[0].attendance;
  }

  public onSortChange(sort: Sort, key: string) {
    this.setSortDisplay(key, sort.active);
    this.sort$.next({ [key]: { field: sort.active, order: sort.direction === 'asc' ? 'asc' : 'dsc' } });
  }

  private setSortDisplay(key: string, fieldName: string) {
    let displayName = fieldName;

    switch (fieldName) {
      case 'totalPoints':
        displayName = 'total points';
        break;
      case 'top100Popularity':
        displayName = 'leaders popularity';
        break;
      case 'last5':
        displayName = 'last 5 games';
        break;
    }

    this.sortDisplay[key] = displayName;
  }

  private filterPlayers(
    players: Player[],
    sort: { field: string; order: 'asc' | 'dsc' },
    filter: Filterable<Player>,
    filterSecond?: Filterable<Player>
  ) {
    const orderBy = { field: sort?.field || 'last5', order: sort?.order || 'dsc' };

    let arrayStream = new ArrayStream<Player>(players).filter(filter);

    if (filterSecond != null) {
      arrayStream = arrayStream.filter(filterSecond);
    }

    return arrayStream.orderByThenBy(orderBy, { field: 'totalPrice', order: 'dsc' }).take(10).collect();
  }
}
