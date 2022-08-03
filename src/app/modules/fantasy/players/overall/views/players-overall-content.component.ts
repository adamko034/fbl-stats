import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersTableState } from 'src/app/common/players/players-table/models/players-table-state';
import { PlayersTableConfig } from 'src/app/common/players/players-table/models/state/players-table-config.model';
import { PlayersToPlayersTableConverter } from 'src/app/common/players/players-table/services/players-to-player-table-converter';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@Component({
  selector: 'app-players-overall-content',
  templateUrl: './players-overall-content.component.html'
})
export class PlayersOverallContentComponent implements OnInit {
  public state$: Observable<PlayersTableState>;

  constructor(
    private _route: ActivatedRoute,
    private _playersConverter: PlayersToPlayersTableConverter,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.state$ = combineLatest([this._route.data, this._authenticationService.isLogged()]).pipe(
      map(([data, userAuth]) => {
        const { properties, players, teams } = data;
        return {
          config: this.getPlayerTableConfig(properties.lastMatchday, userAuth.isLogged),
          players: this._playersConverter.toPlayersTable(players),
          teams: this._playersConverter.toPlayersTableTeam(teams),
          lastMatchday: properties.lastMatchday,
          maxPrice: properties.playerMaxPrice
        };
      })
    );
  }

  private getPlayerTableConfig(lastMatchday: number, isLogged: boolean): PlayersTableConfig {
    return {
      showSeasonTitle: false,
      showMyTeamButtons: true,
      showHideUnavailableFilter: true,
      showMaxPopularityFilter: true,
      showMaxPriceFilter: true,
      showPlayerSearchFilter: true,
      showTeamsFilter: true,
      showNextGame: true,
      showPrediction: true,
      showPredictionFilter: true,
      showFormGames70Minutes: true,
      showFormGamesStarted: true,
      showGames70Minutes: true,
      showGamesStarted: true,
      showTop100Popularity: lastMatchday > 0,
      showTop500Popularity: lastMatchday > 0,
      sortBy: lastMatchday > 0 ? 'formPoints' : 'price',
      showAddOurPicks: isLogged
    };
  }
}
