import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { PlayersStatsPointsPlayer } from '../../../models/players-stats-points-player.model';

@Component({
  selector: 'app-players-stats-points-table',
  templateUrl: './players-stats-points-table.component.html',
  styleUrls: ['./players-stats-points-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsTableComponent implements OnInit, AfterViewInit {
  @Input() players: PlayersStatsPointsPlayer[];
  @Input() defaultSort: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _columns: string[];
  private _statsHeaders: string[];

  public get columns(): string[] {
    return this._columns;
  }

  public get statsHeaders(): string[] {
    return this._statsHeaders;
  }

  public dataSource: MatTableDataSource<PlayersStatsPointsPlayer>;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<PlayersStatsPointsPlayer>();
      this.dataSource.data = [...this.players];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.appendStatsColumns();
      this.onSortChange({ active: this.defaultSort, direction: 'desc' });

      this.changeDetection.detectChanges();
    }
  }

  public getCellValue(player: PlayersStatsPointsPlayer, header: string): number {
    return player.stats.filter((s) => s.header === header)[0]?.value || 0;
  }

  public onSortChange(sort: Sort): void {
    this.paginator.firstPage();

    if (sort.active === 'totalPoints') {
      this.dataSource.data = new ArrayStream(this.players)
        .orderBy(sort.active, sort.direction === 'asc' ? 'asc' : 'dsc')
        .collect();

      return;
    }

    this.dataSource.data = [...this.players].sort((first, second) => {
      const firstValue = first.stats.filter((s) => s.header === sort.active)[0].value;
      const secondValue = second.stats.filter((s) => s.header === sort.active)[0].value;

      if (firstValue - secondValue === 0) {
        return second.totalPoints - first.totalPoints;
      }

      return sort.direction === 'desc' ? secondValue - firstValue : firstValue - secondValue;
    });
  }

  private appendStatsColumns() {
    this._statsHeaders = this.players[0].stats.map((s) => s.header);
    this._columns = ['name', 'position', 'price', 'totalPoints'];
    this._columns.push(...this._statsHeaders);
  }
}
