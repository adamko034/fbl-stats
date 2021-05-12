import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleTableTeam } from 'src/app/modules/teams/bundesliga/fixtures-difficulty/components/shared/schedules-table/models/schedule-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.scss']
})
export class SchedulesTableComponent implements OnChanges, AfterViewInit {
  @Input() sortDirection: 'asc' | 'desc';
  @Input() valueColumnHeader: string;
  @Input() teams: ScheduleTableTeam[];

  @ViewChild(MatSort)
  public matSort: MatSort;

  public dataSource: MatTableDataSource<ScheduleTableTeam> = new MatTableDataSource();

  constructor(private changeDetection: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.teams && !changes.teams.isFirstChange()) {
      this.dataSource.data = this.teams;
      this.changeDetection.detectChanges();
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.data = this.teams;
    this.dataSource.sort = this.matSort;
    this.changeDetection.detectChanges();
  }
}
