import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScheduleTableTeam } from 'src/app/modules/teams/views/teams-schedules/components/shared/schedules-table/models/schedule-table.model';
import { ScheduleTeamTableValueByForm } from 'src/app/modules/teams/views/teams-schedules/converters/schedule-team-table-value-by-form';
import { TeamsSchedulesConverter } from 'src/app/modules/teams/views/teams-schedules/converters/teams-schedules.converter';
import { TeamsSchedulesState } from 'src/app/modules/teams/views/teams-schedules/models/teams-schedules.state';
import { TeamScheduleColorsService } from 'src/app/modules/teams/views/teams-schedules/services/team-schedule-colors.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { Logger } from 'src/app/utils/logger';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-teams-schedules-by-form',
  templateUrl: './teams-schedules-by-form.component.html',
  styleUrls: ['./teams-schedules-by-form.component.scss']
})
export class TeamsSchedulesByFormComponent implements OnInit {
  public includedGames: string;
  public state: TeamsSchedulesState;

  public sortBy: SortBy;

  public get scheduleTableTeams(): ScheduleTableTeam[] {
    if (!this.state.teams || !this.includedGames) {
      return [];
    }

    const valueDeterminer = new ScheduleTeamTableValueByForm(this.includedGames);
    const converter = new TeamsSchedulesConverter(this.scheduleColorService, valueDeterminer);
    return new ArrayStream(this.state.teams).convert(converter).collect();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleColorService: TeamScheduleColorsService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('teams schedules component by form, ng on init');
    combineLatest([this.route.queryParams, this.route.data])
      .pipe(
        map(([params, data]) => {
          return [params.matchdays || '5', data.state];
        }),
        untilDestroyed(this)
      )
      .subscribe(([matchdays, state]) => {
        this.includedGames = matchdays;
        this.state = state;
      });
  }

  public onSortChange(sortBy: SortBy): void {
    Logger.logDev('teams schedules by form component, sort change');
    this.sortBy = sortBy;
  }

  public onFormChange(change: MatSelectChange) {
    this.router.navigate([], { queryParams: { matchdays: change.value }, queryParamsHandling: 'merge' });
  }

  public onIncludeVenueCalculationChange(newaValue: boolean) {
    this.router.navigate([], { queryParams: { includeVenue: newaValue }, queryParamsHandling: 'merge' });
  }
}
