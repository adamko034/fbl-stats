import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectFutureMatchdaysPanelConfig } from 'src/app/common/components/filters/select-future-matchdays-panel/select-future-matchdays-panel-config.model';
import { TeamsSelectState } from 'src/app/common/components/filters/teams-select/models/teams-select-state';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsKickoffTimesFilters } from '../../models/teams-kickoff-times-filters.model';
import { TeamsKickoffTimesFiltersService } from '../../services/teams-kickoff-times-filters.service';

@Component({
  selector: 'app-teams-kickoff-times-filters',
  templateUrl: './teams-kickoff-times-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsKickoffTimesFiltersComponent implements OnInit, OnChanges {
  @Input() filters: TeamsKickoffTimesFilters;
  @Input() teams: Team[];
  @Input() lastMatchday: number;
  @Input() lastKnownMatchday: number;
  @Input() nextUnlimitedTransfersMatchday: number;

  private _teamsSelectState: TeamsSelectState;
  public get teamsSelectState(): TeamsSelectState {
    return this._teamsSelectState;
  }

  private _futureMatchdaysPanelConfig: SelectFutureMatchdaysPanelConfig;
  public get futureMatchdaysPanelConfig(): SelectFutureMatchdaysPanelConfig {
    return this._futureMatchdaysPanelConfig;
  }

  constructor(private filtersService: TeamsKickoffTimesFiltersService) {}

  public ngOnInit(): void {
    this._futureMatchdaysPanelConfig = {
      maxMatchday: this.lastKnownMatchday,
      minMatchday: this.lastMatchday + 1,
      showAllWithEstablishedKickoffTimesLink: true,
      showUnlimitedTransfersLink: this.nextUnlimitedTransfersMatchday < this.lastKnownMatchday
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      this._teamsSelectState = { teams: [], minSelected: 2 };
      this.teams.forEach((team) => {
        const selected = this.filters.teams.includes(team.shortName);
        this._teamsSelectState.teams.push({ longName: team.name, shortName: team.shortName, selected });
      });
    }
  }

  public onFutureMatchdayChange(matchdays: FromTo): void {
    this.filtersService.changeMatchdays(matchdays);
  }

  public onTeamsChange(teams: string[]): void {
    this.filtersService.changeTeams(teams);
  }
}
