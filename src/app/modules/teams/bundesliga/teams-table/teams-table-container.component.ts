import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, tap } from 'rxjs/operators';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { TeamFormSetAction } from 'src/app/modules/teams/bundesliga/teams-table/actions/team-form-set.action';
import { TableTeamConverter } from 'src/app/modules/teams/bundesliga/teams-table/converters/table-team.converter';
import { TeamsGamesFilter } from 'src/app/modules/teams/bundesliga/teams-table/filters/teams-games.fitler';
import { TeamsVenueFilter } from 'src/app/modules/teams/bundesliga/teams-table/filters/teams-venue.filter';
import { TableFilters } from 'src/app/modules/teams/bundesliga/teams-table/models/table-filters.model';
import { TableTeam } from 'src/app/modules/teams/bundesliga/teams-table/models/table-team.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';

@UntilDestroy()
@Component({
  selector: 'app-teams-table-container',
  templateUrl: './teams-table-container.component.html',
  styleUrls: ['./teams-table-container.component.scss']
})
export class TeamsTableContainerComponent implements OnInit {
  private converter: Convertable<Team, TableTeam>;
  private allTeams: TableTeam[] = [];

  public teamsToDisplay: TableTeam[] = [];

  constructor(private route: ActivatedRoute) {
    this.converter = new TableTeamConverter();
  }

  ngOnInit(): void {
    Logger.logDev('teams table container component, ng on init');
    this.route.data
      .pipe(
        filter((data) => !!data?.state),
        map((data) => data.state),
        tap((teams) =>
          Logger.logDev(`teams table container component, router subscripion, resolved ${teams.length} teams`)
        ),
        untilDestroyed(this)
      )
      .subscribe((teams: Team[]) => {
        this.allTeams = new ArrayStream<Team>(teams).convert(this.converter).collect();
        this.filterTeams();
      });
  }

  public onFiltersChange(filters: TableFilters): void {
    this.filterTeams(filters);
  }

  private filterTeams(filters?: TableFilters): void {
    if (!filters) {
      this.teamsToDisplay = new ArrayStream<TableTeam>(this.allTeams).forEach(new TeamFormSetAction(5)).collect();
      return;
    }

    this.teamsToDisplay = new ArrayStream<TableTeam>(this.allTeams)
      .filter(new TeamsVenueFilter(filters.venue))
      .filter(new TeamsGamesFilter(filters.games))
      .forEach(new TeamFormSetAction(filters.games))
      .collect();
  }
}
