import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamsSelectState } from 'src/app/common/components/filters/teams-select/models/teams-select-state';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsKickoffTimesFilters } from '../../models/teams-kickoff-times-filters.model';
import { TeamsKickoffTimesFiltersService } from '../../services/teams-kickoff-times-filters.service';

@Component({
  selector: 'app-teams-kickoff-times-filters',
  templateUrl: './teams-kickoff-times-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsKickoffTimesFiltersComponent implements OnChanges {
  @Input() filters: TeamsKickoffTimesFilters;
  @Input() teams: Team[];
  @Input() lastMatchday: number;
  @Input() lastKnownMatchday: number;

  private _teamsSelectState: TeamsSelectState;
  public get teamsSelectState(): TeamsSelectState {
    return this._teamsSelectState;
  }

  constructor(private filtersService: TeamsKickoffTimesFiltersService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      this._teamsSelectState = { teams: [], minSelected: 2 };
      this.teams.forEach((team) => {
        const selected = this.filters.teams.includes(team.shortName);
        this._teamsSelectState.teams.push({ longName: team.name, shortName: team.shortName, selected });
      });
    }
  }

  public onMatchdaysChange(matchdays: number): void {
    this.filtersService.changeMatchdays(matchdays);
  }

  public onTeamsChange(teams: string[]): void {
    this.filtersService.changeTeams(teams);
  }
}
