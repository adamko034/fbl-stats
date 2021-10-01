import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Logger } from 'src/app/utils/logger';
import { PlayersStatsPointsFilters } from '../../../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../../../models/players-stats-points-player.model';
import { PlayersStatsQueryParamsService } from '../../../services/players-stats-query-params.service';

@Component({
  selector: 'app-players-stats-points-table',
  templateUrl: './players-stats-points-table.component.html',
  styleUrls: ['./players-stats-points-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() players: PlayersStatsPointsPlayer[];
  @Input() type: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _columns: string[];
  private _defaultSort: string;
  private _statsHeaders: { header: string; tooltip: string; hideOnMd: boolean }[];

  public get columns(): string[] {
    return this._columns;
  }

  public get defaultSort(): string {
    return this._defaultSort;
  }

  public get statsHeaders(): { header: string; tooltip: string }[] {
    return this._statsHeaders;
  }

  public filters$: Observable<PlayersStatsPointsFilters>;
  public dataSource: MatTableDataSource<PlayersStatsPointsPlayer>;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private queryParamsService: PlayersStatsQueryParamsService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this._defaultSort = this.players[0]?.stats.filter((s) => s.defaultSort)[0]?.header || 'TP';

    if (!!changes.players && changes.players.currentValue.length > 0 && !changes.players.isFirstChange()) {
      this.prepareDataSource();
    }
  }

  public ngOnInit(): void {
    this.filters$ = this.route.queryParams.pipe(map((params) => this.queryParamsService.convertToFilters(params)));
  }

  public ngAfterViewInit(): void {
    this.prepareDataSource();
  }

  public getCellValue(player: PlayersStatsPointsPlayer, header: string): number {
    return player.stats.filter((s) => s.header === header)[0]?.value || 0;
  }

  public onSortChange(sort: Sort): void {
    if (!sort) {
      return;
    }

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

  public onPositionChange(position: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { pos: position }, queryParamsHandling: 'merge' });
  }

  private prepareDataSource() {
    Logger.logDev(`players stats points table, preparing data source`);

    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<PlayersStatsPointsPlayer>();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.dataSource.data = [...this.players];

    this.appendStatsColumns();
    this.onSortChange({ active: this._defaultSort, direction: 'desc' });
    this.paginator.firstPage();

    this.changeDetection.detectChanges();
  }

  private appendStatsColumns() {
    this._statsHeaders =
      this.players[0]?.stats?.map((s) => ({ header: s.header, tooltip: s.description, hideOnMd: s.hideOnMd })) || [];
    this._columns = ['name', 'position', 'price', 'totalPoints'];
    this._columns.push(...this._statsHeaders.map((s) => s.header));
  }
}
