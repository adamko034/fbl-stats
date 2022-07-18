import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersFilterPrediciton } from '../../models/players-filter-prediction.enum';
import { Position } from '../../models/position.enum';
import { PlayersTableFiltersConfig } from '../models/internal/players-table-filters-config.model';
import { PlayersTableFilters } from '../models/internal/players-table-filters.model';
import { PlayersTableInnerConfig } from '../models/internal/players-table-inner-config.model';
import { PlayersTablePlayerInner } from '../models/internal/players-table-player-inner.model';
import { PlayersTableState } from '../models/players-table-state';
import { PlayersTableFiltersProvider } from '../services/players-table-filters-provider.service';
import { PlayersTablePlayersFiltering } from '../services/players-table-players-filtering.service';
import { PlayersTablePlayersConverter } from '../services/players-table-players.converter';

@UntilDestroy()
@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableComponent implements OnInit, OnChanges {
  @Input() state: PlayersTableState;

  public get seasonTitleText(): string {
    return `Fantasy Players ${this.state.season}`;
  }

  private _filters: PlayersTableFilters;
  public get filters(): PlayersTableFilters {
    return this._filters;
  }

  private _filtersConfig: PlayersTableFiltersConfig;
  public get filtersConfig(): PlayersTableFiltersConfig {
    return this._filtersConfig;
  }

  private _players: PlayersTablePlayerInner[];
  public get players(): PlayersTablePlayerInner[] {
    return this._players;
  }

  private _tableInnerConfig: PlayersTableInnerConfig;
  public get tableInnerConfig(): PlayersTableInnerConfig {
    return this._tableInnerConfig;
  }

  constructor(
    private _route: ActivatedRoute,
    private _filtersProvider: PlayersTableFiltersProvider,
    private _playersFiltering: PlayersTablePlayersFiltering,
    private _playersConverter: PlayersTablePlayersConverter,
    private _myTeamStore: MyTeamStore
  ) {}

  public ngOnInit(): void {
    combineLatest([this._route.queryParams, this._myTeamStore.selectPlayersIds()])
      .pipe(distinctUntilChanged(), untilDestroyed(this))
      .subscribe(([params, myTeamPlayersIds]) => {
        Logger.logDev('players table component, ng on init, setting data');
        this.setFilters(params);
        this.setTableInnerConfig(myTeamPlayersIds);
        this.setFiltersConfig();
        this.setPlayers();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.playersChanged(changes)) {
      Logger.logDev('players table component, ng on changes, players changed, setting players');
      this.setPlayers();
    }
  }

  private playersChanged(changes: SimpleChanges): boolean {
    return (
      changes.state &&
      !changes.state.isFirstChange() &&
      changes.state.currentValue?.players?.length !== changes.state.previousValue?.players?.length
    );
  }

  private setFilters(params: Params): void {
    const defaults: PlayersTableFilters = {
      hideUnavailable: false,
      matchdays: { from: this.state.lastMatchday - 3, to: this.state.lastMatchday },
      maxPopularity: 100,
      maxPrice: this.state.maxPrice,
      playerName: '',
      position: Position.ALL,
      prediction: PlayersFilterPrediciton.ALL,
      sortBy: this.state.config.sortBy ?? 'formPoints',
      sortOrder: this.state.config.sortOrder ?? 'desc',
      teams: []
    };
    this._filters = this._filtersProvider.fromQueryParams(params, defaults);
  }

  private setTableInnerConfig(myTeamPlayersIds: string[]): void {
    this._tableInnerConfig = {
      matchdays: this._filters.matchdays,
      sortBy: this._filters.sortBy,
      sortOrder: this._filters.sortOrder,
      showMyTeamButtons: this.state.config.showMyTeamButtons,
      myTeamPlayersIds: this.state.config.showMyTeamButtons ? myTeamPlayersIds : null,
      showNextGame: this.state.config.showNextGame,
      showPrediction: this.state.config.showPrediction
    };
  }

  private setPlayers(): void {
    const filtered = this._playersFiltering.filter(this.state.players, this._filters);
    this._players = this._playersConverter.toInner(filtered);
  }

  private setFiltersConfig(): void {
    const { lastMatchday, maxPrice } = this.state;
    const {
      showHideUnavailableFilter,
      showMaxPopularityFilter,
      showMaxPriceFilter,
      showPlayerSearchFilter,
      showTeamsFilter,
      showPredictionFilter
    } = this.state.config;

    this._filtersConfig = {
      lastMatchday,
      maxPrice,
      showHideUnavailableFilter,
      showMaxPopularityFilter,
      showPlayerSearchFilter,
      showTeamsFilter,
      showMaxPriceFilter,
      showPredictionFilter
    };
  }
}
