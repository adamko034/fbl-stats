import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersTableState } from 'src/app/common/players/players-table/models/players-table-state';
import { PlayersTableConfig } from 'src/app/common/players/players-table/models/state/players-table-config.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';
import { HistoryConverter } from '../services/history-converter.service';

@Component({
  selector: 'app-history-players',
  templateUrl: './history-players.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPlayersComponent implements OnInit {
  private _title$: Observable<string>;
  public get title$(): Observable<string> {
    return this._title$;
  }

  private _playersTableState$: Observable<PlayersTableState>;
  public get playersTableState$(): Observable<PlayersTableState> {
    return this._playersTableState$;
  }

  private _playersTableConfig: PlayersTableConfig = {
    showHideUnavailableFilter: false,
    showMaxPopularityFilter: true,
    showMaxPriceFilter: true,
    showMyTeamButtons: false,
    showPlayerSearchFilter: true,
    showSeasonTitle: true,
    showTeamsFilter: true,
    showNextGame: false,
    showPrediction: false,
    showPredictionFilter: false,
    sortBy: 'totalPoints',
    sortOrder: 'desc'
  };

  constructor(private _route: ActivatedRoute, private _converter: HistoryConverter) {}

  public ngOnInit(): void {
    this._playersTableState$ = this._route.data.pipe(
      map((data) => {
        const { teams, players, season } = data.history;
        return {
          players: this._converter.toPlayersTablePlayers(players),
          config: this._playersTableConfig,
          lastMatchday: 34,
          maxPrice: new ArrayStream<HistoryPlayer>(players).maxBy((p) => p.price),
          teams: this._converter.toPlayersTableTeams(teams),
          season
        };
      })
    );
  }
}
