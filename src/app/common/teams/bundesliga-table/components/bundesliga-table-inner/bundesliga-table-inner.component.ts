import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Logger } from 'src/app/utils/logger';
import { BundesligaTableTeamResult } from '../../models/internal/bundesliga-table-team-result';

@Component({
  selector: 'app-bundesliga-table-inner',
  templateUrl: './bundesliga-table-inner.component.html',
  styleUrls: ['./bundesliga-table-inner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableInnerComponent implements OnInit {
  @Input() results: BundesligaTableTeamResult[];
  @Input() selectedTeams: string[] = [];

  @ViewChild(MatSort) public sort: MatSort;

  public dataSource: MatTableDataSource<BundesligaTableTeamResult> = new MatTableDataSource();
  private _columns = [
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
    'cs',
    'fts',
    'form'
  ];

  public get columns(): string[] {
    return this._columns;
  }

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.results && !changes.results.isFirstChange()) {
      Logger.logDev('bundesliga table inner, ng on changes, not first change');
      this.dataSource.data = this.results;

      this.onSortChange({ active: this.sort.active, direction: this.sort.direction === 'asc' ? 'asc' : 'desc' });
    }
  }

  public ngAfterViewInit(): void {
    Logger.logDev('bundesliga table inner, ng after view init ' + this.results.length);
    this.dataSource = new MatTableDataSource(this.results);
    this.dataSource.sort = this.sort;

    this.onSortChange({ active: 'points', direction: 'desc' });
  }

  public onSortChange(sort: { active: string; direction: 'asc' | 'desc' }): void {
    this.sort.active = sort.active;
    this.sort.direction = sort.direction;

    const orderBy: { field: string; order: 'asc' | 'dsc' } = {
      field: sort.active,
      order: sort.direction === 'asc' ? 'asc' : 'dsc'
    };
    const thenBy: { field: string; order: 'asc' | 'dsc' } = {
      field: 'rank',
      order: sort.direction === 'asc' ? 'dsc' : 'asc'
    };
    this.dataSource.data = new ArrayStream<BundesligaTableTeamResult>(this.results)
      .orderByThenBy(orderBy, thenBy)
      .collect();
  }

  public isSelected(shortName: string): boolean {
    return this.selectedTeams.includes(shortName);
  }
}
