import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, tap } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';
import { BundesligaTeamFormSetAction } from '../../actions/bundesliga-team-form-set.action';
import { BundesligaTableTeamConverter } from '../../converters/bundesliga-table-team.converter';
import { BundesligaTeamsGamesFilter } from '../../filters/bundesliga-teams-games.fitler';
import { BundesligaTeamsVenueFilter } from '../../filters/bundesliga-teams-venue.filter';
import { BundesligaTableFilters } from '../../models/bundesliga-table-filters.model';
import { BundesligaTableTeam } from '../../models/bundesliga-table-team.model';
import { BundesligaTableTeamService } from '../../services/bundesliga-table-team.service';

@UntilDestroy()
@Component({
  selector: 'app-bundesliga-table',
  templateUrl: './bundesliga-table.component.html',
  styleUrls: ['./bundesliga-table.component.scss']
})
export class BundesligaTableComponent implements OnInit {
  private allTeams: BundesligaTableTeam[] = [];

  public teamsToDisplay: BundesligaTableTeam[] = [];

  constructor(
    private route: ActivatedRoute,
    private converter: BundesligaTableTeamConverter,
    private bundesligaTeamService: BundesligaTableTeamService
  ) {}

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

  public onFiltersChange(filters: BundesligaTableFilters): void {
    this.filterTeams(filters);
  }

  private filterTeams(filters?: BundesligaTableFilters): void {
    if (!filters) {
      this.teamsToDisplay = new ArrayStream<BundesligaTableTeam>(this.allTeams)
        .forEach(new BundesligaTeamFormSetAction(5))
        .collect();
      return;
    }

    this.teamsToDisplay = new ArrayStream<BundesligaTableTeam>(this.allTeams)
      .filter(new BundesligaTeamsVenueFilter(filters.venue, this.bundesligaTeamService))
      .filter(new BundesligaTeamsGamesFilter(filters.games, this.bundesligaTeamService))
      .forEach(new BundesligaTeamFormSetAction(filters.games))
      .collect();
  }
}
