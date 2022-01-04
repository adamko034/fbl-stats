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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SelectDialogConfig } from 'src/app/shared/components/select-dialog/select-dialog-config.model';
import { TableCell } from 'src/app/shared/models/table-cell.model';
import { Logger } from 'src/app/utils/logger';
import { PlayersStatsPointsFilters } from '../../../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../../../models/players-stats-points-player.model';
import { PlayersStatsPointsType } from '../../../models/players-stats-points-type.enum';

@Component({
  selector: 'app-players-stats-points-table',
  templateUrl: './players-stats-points-table.component.html',
  styleUrls: ['./players-stats-points-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsTableComponent implements AfterViewInit, OnChanges {
  @Input() players: PlayersStatsPointsPlayer[];
  @Input() filters: PlayersStatsPointsFilters;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _columns: string[];
  private _statsHeaders: { header: string; tooltip: string; hideOnMd: boolean; isActive: boolean }[];
  private _selectColumnsDialogConfig: SelectDialogConfig;

  public get columns(): string[] {
    return this._columns;
  }

  public get defaultSort(): string {
    if (this.filters.type === PlayersStatsPointsType.FANTASY) {
      return 'total';
    }

    return this.players[0].stats?.filter((s) => s.defaultSort)[0]?.header;
  }

  public get statsHeaders(): { header: string; tooltip: string; isActive: boolean }[] {
    return this._statsHeaders;
  }

  public get selectColumnsDialogConfig(): SelectDialogConfig {
    return this._selectColumnsDialogConfig;
  }

  public dataSource: MatTableDataSource<PlayersStatsPointsPlayer>;

  constructor(private changeDetection: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.players && changes.players.currentValue.length > 0 && !changes.players.isFirstChange()) {
      this.prepareDataSource();
    }
  }

  public ngAfterViewInit(): void {
    this.prepareDataSource();
    console.log('after view init');
  }

  public getCellValue(player: PlayersStatsPointsPlayer, header: string): number {
    return player.stats?.filter((s) => s.header === header)[0]?.value || 0;
  }

  public isColumnActive(player: PlayersStatsPointsPlayer, header: string) {
    return player.stats?.filter((s) => s.header === header)[0]?.includeInTotal || false;
  }

  public shouldShowSelectColumnsDialog(): boolean {
    return this.filters.type === PlayersStatsPointsType.FANTASY && !!this.selectColumnsDialogConfig;
  }

  public onSelectedColumnsChange(selectedColumns: string[]): void {
    this.router.navigate([], { queryParams: { cols: selectedColumns }, queryParamsHandling: 'merge' });
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

    if (sort.active === 'total') {
      this.dataSource.data = new ArrayStream(this.players)
        .convertQuick((player) => ({ player, total: this.getTotal(player) }))
        .orderBy('total', sort.direction === 'asc' ? 'asc' : 'dsc')
        .collect()
        .map((p) => p.player);

      return;
    }

    this.dataSource.data = [...this.players].sort((first, second) => {
      const firstValue = first.stats?.filter((s) => s.header === sort.active)[0].value || 0;
      const secondValue = second.stats?.filter((s) => s.header === sort.active)[0].value || 0;

      if (firstValue - secondValue === 0) {
        return second.totalPoints - first.totalPoints;
      }

      return sort.direction === 'desc' ? secondValue - firstValue : firstValue - secondValue;
    });
  }

  public onPositionChange(position: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { pos: position }, queryParamsHandling: 'merge' });
  }

  public getTotal(player: PlayersStatsPointsPlayer): number {
    return new ArrayStream<TableCell>(player.stats)
      .filterQuick((s) => s.includeInTotal !== undefined && s.includeInTotal && this._columns.includes(s.header))
      .sumBy((s) => s.value);
  }

  private prepareDataSource() {
    Logger.logDev(`players stats points table, preparing data source`);

    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<PlayersStatsPointsPlayer>();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.dataSource.data = [...this.players];

    this.setColumns();
    this.setSelectColumnsDialogConfig();

    const sortActive = this.statsHeaders.some((s) => s.header === this.sort.active)
      ? this.sort.active
      : this.defaultSort;
    this.sort.active = sortActive;
    this.onSortChange({ active: sortActive, direction: this.sort.direction });

    this.paginator.firstPage();
    this.changeDetection.detectChanges();
  }

  private setColumns() {
    const allStats = this.players[0]?.stats || [];

    this._statsHeaders = new ArrayStream<TableCell>(allStats)
      .filterQuick((cell) => this.filters.selectedColumns == null || this.filters.selectedColumns.includes(cell.header))
      .convertQuick((cell) => ({
        header: cell.header,
        tooltip: cell.description,
        hideOnMd: cell.hideOnMd,
        isActive: cell.includeInTotal
      }))
      .collect();

    this._columns = ['name', 'position', 'price', 'totalPoints'];
    this._columns.push(...this._statsHeaders.map((s) => s.header));

    if (this.filters.type === PlayersStatsPointsType.FANTASY) {
      this._columns.push('total');
    }
  }

  private setSelectColumnsDialogConfig(): void {
    this._selectColumnsDialogConfig = {
      label: 'Select columns',
      itemsSelectedLabel: '{} columns selected.',
      noItemsSelectedLabel: 'No columns selected',
      openDialogLabel: 'Select columns',
      onlyIconOnMobile: false,
      options: this.players[0]?.stats?.map((stat) => ({
        label: stat.description,
        selected: this.filters.selectedColumns?.length > 0 ? this.filters.selectedColumns?.includes(stat.header) : true,
        value: stat.header,
        order: stat.order
      }))
    };
  }
}
