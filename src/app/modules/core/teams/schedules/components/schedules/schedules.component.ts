import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { TeamSchedule } from 'src/app/modules/core/teams/schedules/models/team-schedule.model';
import { TeamsSchedulesState } from 'src/app/modules/core/teams/schedules/models/teams-schedules.state';
import { TeamScheduleColorsService } from 'src/app/modules/core/teams/schedules/services/team-schedule-colors.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Range } from 'src/app/shared/models/range.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @Input() state: TeamsSchedulesState;
  @Input() showLegend = true;

  public sort: Sort = { active: 'next3GamesIndex', direction: 'desc' };
  public order = '-next3GamesIndex';
  public screen$: Observable<ScreenSize>;
  public screens = ScreenSize;

  public orders: { value: string; text: string }[] = [
    { value: 'next2GamesIndex', text: 'Next 2 games difficulty' },
    { value: 'next3GamesIndex', text: 'Next 3 games difficulty' },
    { value: 'next5GamesIndex', text: 'Next 5 games difficulty' }
  ];
  public selectedOrderText = 'Next 3 games difficulty';
  public direction = 'desc';

  constructor(private screenSizeService: ScreenSizeService, private teamScheduleColors: TeamScheduleColorsService) {}

  public ngOnInit(): void {
    this.screen$ = this.screenSizeService.onResize();
    this.state.mdsHeader.forEach((md) => this.orders.push({ value: `games.${md}.gameIndex`, text: `MD ${md}` }));
  }

  public getGames(team: TeamSchedule) {
    return Object.values(team.games);
  }

  public onMobileSortChange(order: { value: string; text: string }): void {
    this.sort.active = order.value;
    this.selectedOrderText = order.text;
    this.onSortChange(this.sort);
  }

  public onToggleOrder(): void {
    this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    this.onSortChange(this.sort);
  }

  public isActiveOrder(order: string): boolean {
    return this.order.includes(order);
  }

  public getColors(): { [color: string]: Range } {
    return this.teamScheduleColors.getAllColors();
  }

  public orderByMax(a: KeyValue<string, Range>, b: KeyValue<string, Range>): number {
    return b.value.max - a.value.max;
  }

  private onSortChange(sort: Sort): void {
    this.sort = sort;
    this.order = `${sort.direction === 'desc' ? '-' : ''}${sort.active}`;
  }
}
