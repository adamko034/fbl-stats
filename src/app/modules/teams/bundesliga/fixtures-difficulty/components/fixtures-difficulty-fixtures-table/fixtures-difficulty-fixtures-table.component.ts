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
import { FixtureDifficultyTableTeam } from 'src/app/modules/teams/bundesliga/fixtures-difficulty/models/fixture-difficulty-table-team.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-fixtures-table',
  templateUrl: './fixtures-difficulty-fixtures-table.component.html',
  styleUrls: ['./fixtures-difficulty-fixtures-table.component.scss']
})
export class FixturesDifficultyFixturesTableComponent implements OnChanges, AfterViewInit {
  @Input() sortDirection: 'asc' | 'desc';
  @Input() valueColumnHeader: string;
  @Input() teams: FixtureDifficultyTableTeam[];

  @ViewChild(MatSort)
  public matSort: MatSort;

  public dataSource: MatTableDataSource<FixtureDifficultyTableTeam> = new MatTableDataSource();

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
