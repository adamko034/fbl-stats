import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { ScheduleTableTeam } from 'src/app/modules/teams/views/teams-schedules/components/shared/schedules-table/models/schedule-table.model';
import { ScheduleTeamTableValueByRank } from 'src/app/modules/teams/views/teams-schedules/converters/schedule-team-table-value-by-rank';
import { TeamsSchedulesConverter } from 'src/app/modules/teams/views/teams-schedules/converters/teams-schedules.converter';
import { TeamsSchedulesState } from 'src/app/modules/teams/views/teams-schedules/models/teams-schedules.state';
import { TeamScheduleColorsService } from 'src/app/modules/teams/views/teams-schedules/services/team-schedule-colors.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { Logger } from 'src/app/utils/logger';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-teams-schedules-by-rank',
  templateUrl: './teams-schedules-by-rank.component.html',
  styleUrls: ['./teams-schedules-by-rank.component.scss']
})
export class TeamsSchedulesByRankComponent implements OnInit {
  public state: TeamsSchedulesState;
  public sortBy: SortBy;

  public get scheduleTableTeams(): ScheduleTableTeam[] {
    if (!this.state.teams) {
      return [];
    }

    const valueDeterminer = new ScheduleTeamTableValueByRank();
    const converter = new TeamsSchedulesConverter(this.scheduleColorService, valueDeterminer);
    return new ArrayStream(this.state.teams).convert(converter).collect();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleColorService: TeamScheduleColorsService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('teams schedules component by rank, ng on init');
    this.route.data
      .pipe(
        map((data) => data.state),
        untilDestroyed(this)
      )
      .subscribe((state) => (this.state = state));
  }

  public onSortChange(sortBy: SortBy): void {
    this.sortBy = sortBy;
  }

  public onIncludeVenueCalculationChange(newValue: boolean) {
    this.router.navigate([], { queryParams: { includeVenue: newValue }, queryParamsHandling: 'merge' });
  }
}
