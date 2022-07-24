import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { PlayersTableState } from 'src/app/common/players/players-table/models/players-table-state';
import { PlayersToPlayersTableConverter } from 'src/app/common/players/players-table/services/players-to-player-table-converter';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Properties } from 'src/app/store/properties/properties.model';
import { Logger } from 'src/app/utils/logger';
import { MyTeamState } from '../models/my-team-state.model';
import { MyTeamTilesDisplaySettingsService } from '../services/my-team-tiles-display-settings.service';

@Component({
  selector: 'app-my-team-content',
  templateUrl: './my-team-content.component.html'
})
export class MyTeamContentComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [{ labelMobile: 'My team', label: 'My team', order: 1, routerLink: '' }];
  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  public state$: Observable<MyTeamState>;

  constructor(
    private _route: ActivatedRoute,
    private _myTeamStore: MyTeamStore,
    private _playersToPlayersTableConverter: PlayersToPlayersTableConverter,
    private _fixturesStore: FixturesStore,
    private myTeamDisplaySettingsService: MyTeamTilesDisplaySettingsService
  ) {}

  public ngOnInit(): void {
    this.state$ = combineLatest([
      this._route.data,
      this._myTeamStore.selectPlayers(),
      this.myTeamDisplaySettingsService.select(),
      this._fixturesStore.selectAll()
    ]).pipe(
      distinctUntilChanged(),
      map(([data, myTeamPlayers, displaySettings, fixtures]) => {
        Logger.logDev(`my team content, got new state, got ${myTeamPlayers.length} my team players`);

        const { lastKnownMatchday, lastMatchday } = data.properties;
        const nextFixtures = new ArrayStream<MatchdayFixtures>(fixtures)
          .filterQuick((f) => f.matchdayNumber > lastMatchday)
          .orderBy('matchdayNumber', 'asc')
          .collect();

        return {
          players: myTeamPlayers,
          playersTableState: this.toPlayersTableState(myTeamPlayers, data.properties),
          kickOffTimesMatchdays: 0,
          displaySettings,
          lastKnownMatchday,
          lastMatchday,
          nextFixtures
        };
      })
    );
  }

  private toPlayersTableState(players: Player[], properties: Properties): PlayersTableState {
    return {
      config: {
        showMyTeamButtons: false,
        showSeasonTitle: false,
        showHideUnavailableFilter: false,
        showMaxPopularityFilter: false,
        showMaxPriceFilter: false,
        showPlayerSearchFilter: false,
        showTeamsFilter: false,
        showNextGame: true,
        showPrediction: true,
        showPredictionFilter: true,
        showTop100Popularity: properties.lastMatchday > 0,
        showTop500Popularity: properties.lastMatchday > 0,
        showFormGames70Minutes: true,
        showFormGamesStarted: true,
        showGames70Minutes: true,
        showGamesStarted: true
      },
      lastMatchday: properties.lastMatchday,
      maxPrice: properties.playerMaxPrice,
      players: this._playersToPlayersTableConverter.toPlayersTable(players),
      teams: []
    };
  }
}
