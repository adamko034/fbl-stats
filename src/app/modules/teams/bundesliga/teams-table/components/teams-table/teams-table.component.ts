import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableTeam } from 'src/app/modules/teams/bundesliga/teams-table/models/table-team.model';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Logger } from 'src/app/utils/logger';

@UntilDestroy()
@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})
export class TeamsTableComponent implements OnChanges, AfterViewInit {
  @Input() teams: TableTeam[];

  public dataSource: MatTableDataSource<TableTeam> = new MatTableDataSource();
  private allColumns = [
    'rank',
    'team',
    'points',
    'gamesPlayed',
    'wins',
    'draws',
    'losses',
    'goals',
    'gspg',
    'gcpg',
    'form'
  ];

  public displayedColumns: string[] = [];

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.screenSizeService
      .onResize()
      .pipe(untilDestroyed(this))
      .subscribe((screen) => {
        if (screen > ScreenSize.SM) {
          this.displayedColumns = [...this.allColumns];
          return;
        }

        if (screen === ScreenSize.SM) {
          this.displayedColumns = this.allColumns.filter((c) => c !== 'gspg' && c !== 'gcpg');
          return;
        }

        if (screen < ScreenSize.SM) {
          this.displayedColumns = this.allColumns.filter((c) => c !== 'gspg' && c !== 'gcpg' && c !== 'form');
          return;
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.teams && !changes.teams.isFirstChange()) {
      this.dataSource.data = this.teams;
    }
  }

  public ngAfterViewInit(): void {
    Logger.logDev('teams table component, ng after view init ' + this.teams.length);
    this.dataSource = new MatTableDataSource(this.teams);
    this.dataSource.sort = this.sort;
  }
}
