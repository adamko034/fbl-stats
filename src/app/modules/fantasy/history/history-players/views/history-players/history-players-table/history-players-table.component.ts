import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { HistoryPlayer } from '../../../../../../../store/history/models/history-player.model';
import { HistoryPlayersFilters } from '../../../models/history-players-filters.model';
import { HistoryPlayersFiltersService } from '../../../services/history-players-fitlers.service';

@UntilDestroy()
@Component({
  selector: 'app-history-players-table',
  templateUrl: './history-players-table.component.html',
  styleUrls: ['./history-players-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPlayersTableComponent implements OnInit, AfterViewInit {
  @Input() players: HistoryPlayer[];

  private _columns = [
    'name',
    'position',
    'price',
    'popularity',
    'leadersPopularity',
    'totalPoints',
    'avg',
    'firstLegPoints',
    'secondLegPoints',
    'homeGamesPoints',
    'homeAvg',
    'awayGamesPoints',
    'awayAvg',
    'tenPointsEfficiency',
    'fifteenPointsEfficiency'
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public search = new FormControl();
  public dataSource: MatTableDataSource<HistoryPlayer>;

  public get columns(): string[] {
    return this._columns;
  }

  constructor(private filtersService: HistoryPlayersFiltersService) {}

  public ngOnInit(): void {
    this.search.valueChanges.pipe(untilDestroyed(this)).subscribe((term) => {
      if (!!this.dataSource) {
        this.dataSource.filter = term;
      }
    });

    this.filtersService
      .select()
      .pipe(untilDestroyed(this))
      .subscribe((filters: HistoryPlayersFilters) => this.filterPlayers(filters));
  }

  public ngAfterViewInit(): void {
    this.prepareDataSource();
  }

  public clearSearch(): void {
    this.search.reset();
  }

  private filterPlayers(filters: HistoryPlayersFilters): void {
    if (!this.dataSource) {
      return;
    }

    let filtered = [...this.players].filter(
      (p) => p.price <= filters.maxPrice && p.popularity <= filters.maxPopularity
    );

    if (filters.position !== PlayerPosition.ALL) {
      filtered = filtered.filter((p) => p.position === filters.position);
    }

    if (filters.teams.length > 0) {
      filtered = filtered.filter((p) => filters.teams.includes(p.team));
    }

    this.dataSource.data = filtered;
  }

  private prepareDataSource() {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = [...this.players];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.sort.sortChange.pipe(untilDestroyed(this)).subscribe(() => this.dataSource.paginator.firstPage());
      this.dataSource.filterPredicate = (data, filter) =>
        !!filter && data.name.toLowerCase().includes(filter.toLowerCase());
    }
  }
}
