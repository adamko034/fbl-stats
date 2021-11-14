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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Logger } from 'src/app/utils/logger';
import { TeamsBundesligaTableTeam } from '../../../models/teams-bundesliga-table-team.model';

@UntilDestroy()
@Component({
  selector: 'app-bundesliga-teams-table',
  templateUrl: './bundesliga-teams-table.component.html',
  styleUrls: ['./bundesliga-teams-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTeamsTableComponent implements OnChanges, AfterViewInit {
  @Input() teams: TeamsBundesligaTableTeam[];

  public dataSource: MatTableDataSource<TeamsBundesligaTableTeam> = new MatTableDataSource();
  private allColumns = [
    'rank',
    'team',
    'points',
    'gamesPlayed',
    'wins',
    'draws',
    'losses',
    'goalsScored',
    'goalsConceded',
    'goalsDiff',
    'gspg',
    'gcpg',
    'cleanSheetsPercentage',
    'failedToScorePercentage',
    'form'
  ];

  private mdColumns = [
    'rank',
    'team',
    'points',
    'gamesPlayed',
    'wins',
    'draws',
    'losses',
    'goalsScored',
    'goalsConceded',
    'goalsDiff',
    'cleanSheetsPercentage',
    'failedToScorePercentage',
    'form'
  ];

  private smColumns = [
    'rank',
    'team',
    'points',
    'gamesPlayed',
    'wins',
    'draws',
    'losses',
    'goalsScored',
    'goalsConceded',
    'goalsDiff'
  ];

  private xsColumns = ['rank', 'team', 'points', 'gamesPlayed', 'wins', 'draws', 'losses', 'goals'];

  public displayedColumns: string[] = [];
  public smallFont = false;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private screenSizeService: ScreenSizeService, private changeDetection: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.screenSizeService
      .onResize()
      .pipe(untilDestroyed(this))
      .subscribe((screen) => {
        this.smallFont = false;

        if (this.teams[0].gamesPlayed === 0) {
          this.allColumns = this.allColumns.filter((x) => x !== 'form');
          this.changeDetection.detectChanges();
        }

        if (screen > ScreenSize.MD) {
          this.displayedColumns = [...this.allColumns];
          this.changeDetection.detectChanges();
          return;
        }

        if (screen === ScreenSize.MD) {
          this.displayedColumns = [...this.mdColumns];
          this.changeDetection.detectChanges();
          return;
        }

        if (screen === ScreenSize.SM) {
          this.displayedColumns = [...this.smColumns];
          this.changeDetection.detectChanges();
          return;
        }

        if (screen < ScreenSize.SM) {
          if (screen < ScreenSize.XS) {
            this.smallFont = true;
          }

          this.displayedColumns = [...this.xsColumns];
          this.changeDetection.detectChanges();
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
