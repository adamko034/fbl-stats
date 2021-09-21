import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { PlayersTableGenericColumn } from './models/players-table-generic-column.model';

@Component({
  selector: 'app-players-table-generic',
  templateUrl: './players-table-generic.component.html',
  styleUrls: ['./players-table-generic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableGenericComponent implements OnInit, AfterViewInit {
  @Input() data: any[];
  @Input() columns: PlayersTableGenericColumn[];
  @Input() initialSortField: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _dataSource: MatTableDataSource<any>;
  private _displayedColumns: string[];

  public get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }

  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  constructor() {}

  public ngOnInit(): void {
    this.setDisplayedColumns();
  }

  public ngAfterViewInit(): void {
    this.prepareDataSource();
  }

  private setDisplayedColumns(): void {
    this._displayedColumns = new ArrayStream<PlayersTableGenericColumn>(this.columns)
      .orderBy('order', 'asc')
      .concat([
        { order: -100, header: 'No', fieldName: 'no' },
        { order: -99, header: 'Name', fieldName: 'name' },
        { order: -98, header: 'Pos', fieldName: 'position' }
      ])
      .collect()
      .map((c) => c.fieldName);
  }

  private prepareDataSource(): void {
    if (!this._dataSource) {
      this._dataSource = new MatTableDataSource<any>();
      this._dataSource.data = [...this.data];
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
      this.sort.sortChange.pipe(untilDestroyed(this)).subscribe(() => this._dataSource.paginator.firstPage());
      this._dataSource.filterPredicate = (data, filter) =>
        !!filter && data.name.toLowerCase().includes(filter.toLowerCase());
    }
  }
}
