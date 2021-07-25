import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, tap } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';
import { BundesligaTeamFormSetAction } from '../../actions/bundesliga-team-form-set.action';
import { BundesligaTeamsGamesFilter } from '../../filters/bundesliga-teams-games.fitler';
import { BundesligaTeamsVenueFilter } from '../../filters/bundesliga-teams-venue.filter';
import { BundesligaTableFilters } from '../../models/bundesliga-table-filters.model';
import { BundesligaTableTeamService } from '../../services/bundesliga-table-team.service';

@UntilDestroy()
@Component({
  selector: 'app-bundesliga-table',
  templateUrl: './bundesliga-table.component.html',
  styleUrls: ['./bundesliga-table.component.scss']
})
export class BundesligaTableComponent implements OnInit {
  private allTeams: Team[] = [];

  public teamsToDisplay: Team[] = [];
  public noGamesPlayed = true;

  constructor(private route: ActivatedRoute, private bundesligaTeamService: BundesligaTableTeamService) {}

  ngOnInit(): void {
    Logger.logDev('teams table container component, ng on init');
    this.route.data
      .pipe(
        filter((data) => !!data?.allTeams),
        map((data) => data.allTeams),
        tap((teams) =>
          Logger.logDev(`teams table container component, router subscripion, resolved ${teams.length} teams`)
        ),
        untilDestroyed(this)
      )
      .subscribe((teams: Team[]) => {
        this.noGamesPlayed = teams[0].gamesPlayed === 0;
        this.allTeams = [...teams];
        this.filterTeams();
      });
  }

  public onFiltersChange(filters: BundesligaTableFilters): void {
    this.filterTeams(filters);
  }

  private filterTeams(filters?: BundesligaTableFilters): void {
    if (!filters) {
      this.teamsToDisplay = new ArrayStream<Team>(this.allTeams).forEach(new BundesligaTeamFormSetAction(5)).collect();
      return;
    }

    this.teamsToDisplay = new ArrayStream<Team>(this.allTeams)
      .filter(new BundesligaTeamsVenueFilter(filters.venue, this.bundesligaTeamService))
      .filter(new BundesligaTeamsGamesFilter(filters.games, this.bundesligaTeamService))
      .forEach(new BundesligaTeamFormSetAction(filters.games))
      .collect();
  }
}
