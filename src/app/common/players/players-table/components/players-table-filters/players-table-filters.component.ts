import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamsSelectState } from 'src/app/common/components/filters/teams-select/models/teams-select-state';
import { TeamsSelectTeam } from 'src/app/common/components/filters/teams-select/models/teams-select-team.model';
import { RouterNavigationService } from 'src/app/common/services/router-navigation.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { Logger } from 'src/app/utils/logger';
import { PlayersFilterPrediciton } from '../../../models/players-filter-prediction.enum';
import { Position } from '../../../models/position.enum';
import { PlayersTableFiltersConfig } from '../../models/internal/players-table-filters-config.model';
import { PlayersTableFilters } from '../../models/internal/players-table-filters.model';
import { PlayersTableTeam } from '../../models/state/players-table-team.model';

@Component({
  selector: 'app-players-table-filters',
  templateUrl: './players-table-filters.component.html',
  styleUrls: ['./players-table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableFiltersComponent implements OnChanges {
  @Input() filters: PlayersTableFilters;
  @Input() config: PlayersTableFiltersConfig;
  @Input() teams: PlayersTableTeam[];

  public screens = ScreenSize;

  private _teamsSelectState: TeamsSelectState;
  public get teamsSelectState(): TeamsSelectState {
    return this._teamsSelectState;
  }

  constructor(private _routerNavigation: RouterNavigationService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      Logger.logDev('players table filters component, ng on changes, get new filters');
      this._teamsSelectState = { teams: this.convertTeams(), minSelected: 1 };
    }
  }

  public onMaxPriceChange(newValue: number): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ maxPrice: newValue });
  }

  public onMaxPopularityChange(newValue: number): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ maxPopularity: newValue });
  }

  public onPositionChange(newValue: Position): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ position: newValue });
  }

  public onHideUnavailableChange(newValue: boolean): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ hideUnavailable: newValue });
  }

  public onMatchdayChange(matchdays: FromTo): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ mdFrom: matchdays.from, mdTo: matchdays.to });
  }

  public onPredicitonChange(prediction: PlayersFilterPrediciton): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ prediction });
  }

  public onSelectedTeamsChange(selectedTeams: string[]): void {
    this._routerNavigation.toSameRouteWithMergedQueryParams({ teams: selectedTeams });
  }

  public onPlayerSearch(term: string): void {
    const name = term === '' ? null : term;
    this._routerNavigation.toSameRouteWithMergedQueryParams({ name });
  }

  public clearFilters(): void {
    this._routerNavigation.toSameRouteClearParams();
  }

  private convertTeams(): TeamsSelectTeam[] {
    return new ArrayStream<PlayersTableTeam>(this.teams)
      .convertQuick((t) => ({
        shortName: t.shortName,
        longName: t.longName,
        selected: this.isTeamSelected(t)
      }))
      .collect();
  }

  private isTeamSelected(team: PlayersTableTeam): boolean {
    return this.filters.teams.some((t) => t.toLocaleLowerCase() === team.shortName.toLocaleLowerCase());
  }
}
