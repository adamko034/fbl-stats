import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamSchedule } from 'src/app/modules/teams/bundesliga/teams-schedules/models/team-schedule.model';
import { TeamsSchedulesState } from 'src/app/modules/teams/bundesliga/teams-schedules/models/teams-schedules.state';
import { TeamScheduleColorsService } from 'src/app/modules/teams/bundesliga/teams-schedules/services/team-schedule-colors.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @Input() state: TeamsSchedulesState;
  @Input() sortBy: SortBy;

  public screen$: Observable<ScreenSize>;
  public screens = ScreenSize;

  constructor(private screenSizeService: ScreenSizeService, private teamScheduleColors: TeamScheduleColorsService) {}

  public ngOnInit(): void {
    this.screen$ = this.screenSizeService.onResize();
  }

  public getGames(team: TeamSchedule) {
    return Object.values(team.games);
  }
}
