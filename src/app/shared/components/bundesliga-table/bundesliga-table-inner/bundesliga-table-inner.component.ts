import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { Logger } from 'src/app/utils/logger';
import { BundesligaTableConfig } from '../models/bundesliga-table-config.model';
import { BundesligaTableTeam } from '../models/bundesliga-table-team.model';

@UntilDestroy()
@Component({
  selector: 'app-bundesliga-table-inner',
  templateUrl: './bundesliga-table-inner.component.html',
  styleUrls: ['./bundesliga-table-inner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableInnerComponent implements OnInit {
  @Input() teams: BundesligaTableTeam[];
  @Input() config: BundesligaTableConfig;

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
    'diff',
    'gspg',
    'gcpg',
    'cs',
    'fts',
    'form'
  ];

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

        if (this.teams[0].gamesPlayed === 0 || !this.config.showTeamForm) {
          this.allColumns = this.allColumns.filter((x) => x !== 'form');
        }

        this.displayedColumns = [...this.allColumns];

        // if (screen > ScreenSize.SM) {
        //   this.displayedColumns = [...this.allColumns];
        // }

        // if (screen === ScreenSize.SM) {
        //   this.displayedColumns = this.allColumns.filter((c) => c !== 'gspg' && c !== 'gcpg');
        // }

        // if (screen < ScreenSize.SM) {
        //   this.displayedColumns = this.allColumns.filter((c) => c !== 'gspg' && c !== 'gcpg' && c !== 'form');
        // }

        // if (screen < ScreenSize.XS) {
        //   this.smallFont = true;
        //   this.displayedColumns = this.allColumns.filter(
        //     (c) => c !== 'gspg' && c !== 'gcpg' && c !== 'form' && c !== 'diff' && c !== 'gamesPlayed'
        //   );
        // }

        this.changeDetection.detectChanges();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.teams && !changes.teams.isFirstChange()) {
      this.dataSource.data = this.teams;

      if (['cs', 'diff', 'fts'].includes(this.sort.active)) {
        this.onSortChange({ active: this.sort.active, direction: this.sort.direction === 'asc' ? 'asc' : 'desc' });
      }
    }
  }

  public ngAfterViewInit(): void {
    Logger.logDev('bundesliga table inner, ng after view init ' + this.teams.length);
    this.dataSource = new MatTableDataSource(this.teams);
    this.dataSource.sort = this.sort;
  }

  public getGoalsDiff(team: BundesligaTableTeam): string {
    return `${team.goalsDiff > 0 ? '+' : ''}${team.goalsDiff}`;
  }

  public onSortChange(sort: { active: string; direction: 'asc' | 'desc' }): void {
    if (['cs', 'diff', 'fts'].includes(sort.active)) {
      const fields = { cs: 'cleanSheets', diff: 'goalsDiff', fts: 'failedToScore' };
      const orderBy: { field: string; order: 'asc' | 'dsc' } = {
        field: fields[sort.active],
        order: sort.direction === 'asc' ? 'asc' : 'dsc'
      };
      const thenBy: { field: string; order: 'asc' | 'dsc' } = { field: 'rank', order: 'asc' };
      this.dataSource.data = new ArrayStream<BundesligaTableTeam>(this.teams).orderByThenBy(orderBy, thenBy).collect();
    }
  }
}
