import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Logger } from 'src/app/utils/logger';
import { BundesligaTableTeam } from '../../../models/bundesliga-table-team.model';

@UntilDestroy()
@Component({
  selector: 'app-bundesliga-teams-table',
  templateUrl: './bundesliga-teams-table.component.html',
  styleUrls: ['./bundesliga-teams-table.component.scss']
})
export class BundesligaTeamsTableComponent implements OnChanges, AfterViewInit {
  @Input() teams: BundesligaTableTeam[];

  public dataSource: MatTableDataSource<BundesligaTableTeam> = new MatTableDataSource();
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
  public gamesColumnDisplay = 'Games';
  public pointsColumnDisplay = 'Points';
  public smallFont = false;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.screenSizeService
      .onResize()
      .pipe(untilDestroyed(this))
      .subscribe((screen) => {
        this.gamesColumnDisplay = 'Games';
        this.pointsColumnDisplay = 'Points';
        this.smallFont = false;

        if (screen > ScreenSize.SM) {
          this.displayedColumns = [...this.allColumns];
          return;
        }

        if (screen === ScreenSize.SM) {
          this.displayedColumns = this.allColumns.filter((c) => c !== 'gspg' && c !== 'gcpg');
          return;
        }

        if (screen < ScreenSize.SM) {
          if (screen < ScreenSize.XS) {
            this.smallFont = true;
          }

          this.gamesColumnDisplay = 'G';
          this.pointsColumnDisplay = 'Pts';
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
