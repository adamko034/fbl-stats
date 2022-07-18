import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersTableState } from 'src/app/common/players/players-table/models/players-table-state';
import { PlayersTableConfig } from 'src/app/common/players/players-table/models/state/players-table-config.model';
import { PlayersToPlayersTableConverter } from 'src/app/common/players/players-table/services/players-to-player-table-converter';

@Component({
  selector: 'app-players-overall-content',
  templateUrl: './players-overall-content.component.html'
})
export class PlayersOverallContentComponent implements OnInit {
  private _playersTableConfig: PlayersTableConfig = {
    showSeasonTitle: false,
    showMyTeamButtons: true,
    showHideUnavailableFilter: true,
    showMaxPopularityFilter: true,
    showMaxPriceFilter: true,
    showPlayerSearchFilter: true,
    showTeamsFilter: true,
    showNextGame: true,
    showPrediction: true,
    showPredictionFilter: true
  };

  public state$: Observable<PlayersTableState>;

  constructor(private _route: ActivatedRoute, private _playersConverter: PlayersToPlayersTableConverter) {}

  public ngOnInit(): void {
    this.state$ = this._route.data.pipe(
      map(({ players, teams, properties }) => {
        return {
          config: this._playersTableConfig,
          players: this._playersConverter.toPlayersTable(players),
          teams: this._playersConverter.toPlayersTableTeam(teams),
          lastMatchday: properties.lastMatchday,
          maxPrice: properties.playerMaxPrice
        };
      })
    );
  }
}
