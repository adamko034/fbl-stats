import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RouterNavigationService } from 'src/app/common/services/router-navigation.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersTableInnerConfig } from '../../models/internal/players-table-inner-config.model';
import { PlayersTablePlayerInner } from '../../models/internal/players-table-player-inner.model';

@UntilDestroy()
@Component({
  selector: 'app-players-table-inner',
  templateUrl: './players-table-inner.component.html',
  styleUrls: ['./players-table-inner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableInnerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() players: PlayersTablePlayerInner[];
  @Input() config: PlayersTableInnerConfig;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _dataSource: MatTableDataSource<PlayersTablePlayerInner>;
  public get dataSource(): MatTableDataSource<PlayersTablePlayerInner> {
    return this._dataSource;
  }

  private _columns: string[];
  public get columns(): string[] {
    return this._columns;
  }

  public get matchdays(): string[] {
    const mds = [];
    if (this.config.matchdays.to > 0 && this.config.matchdays.from > 0) {
      for (let i = this.config.matchdays.to; i >= this.config.matchdays.from; i--) {
        mds.push(i.toString());
      }
    }

    return mds;
  }

  constructor(private _navigationService: RouterNavigationService, private _myTeamStore: MyTeamStore) {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.players && !changes.players.isFirstChange()) {
      this.setColumns();
      this._dataSource.data = this.sortPlayers();
    }
  }

  public ngAfterViewInit(): void {
    this.prepareDataSource();
    this.setColumns();
  }

  public onAddToMyTeam(playerId: string): void {
    Logger.logDev(`players table inner, adding to my team: ${playerId}`);
    this._myTeamStore.add(playerId);
  }

  public onRemoveFromMyTeam(playerId: string) {
    Logger.logDev(`players table inner, removing from my team ${playerId}`);
    this._myTeamStore.remove(playerId);
  }

  private prepareDataSource(): void {
    if (!this._dataSource) {
      this._dataSource = new MatTableDataSource([]);
      this._dataSource.paginator = this.paginator;

      this.dataSource.data = this.sortPlayers();
      this.sort.sortChange.pipe(untilDestroyed(this)).subscribe((sort: Sort) => {
        this._navigationService.toSameRouteWithMergedQueryParams({ sortBy: sort.active, sortOrder: sort.direction });
        this._dataSource.paginator.firstPage();
      });
    }

    this.dataSource.paginator?.firstPage();
  }

  private sortPlayers(): PlayersTablePlayerInner[] {
    return new ArrayStream(this.players)
      .orderByThenBy(
        { field: this.config.sortBy, order: this.config.sortOrder === 'asc' ? 'asc' : 'dsc' },
        { field: 'totalPoints', order: 'dsc' },
        { field: 'price', order: 'dsc' }
      )
      .collect();
  }

  private setColumns(): void {
    this._columns = [];
    this.columns.push('no');
    this.columns.push('name');
    this.columns.push('position');
    this.columns.push('price');
    this.columns.push('popularity');

    if (this.config.showTop100Popularity) {
      this.columns.push('top100Popularity');
    }

    if (this.config.showTop500Popularity) {
      this.columns.push('top500Popularity');
    }

    this.columns.push('totalPoints');
    this.columns.push('totalAvgPoints');

    if (this.config.showGamesStarted) {
      this.columns.push('totalGamesStarted');
    }

    if (this.config.showGames70Minutes) {
      this.columns.push('totalGames70Min');
    }

    if (this.config.showNextGame) {
      this.columns.push('next');
    }

    if (this.config.showPrediction) {
      this.columns.push('prediction');
    }

    this.columns.push('formPoints');
    this.columns.push('formAvgPoints');

    if (this.config.showFormGamesStarted) {
      this.columns.push('formGamesStarted');
    }

    if (this.config.showFormGames70Minutes) {
      this.columns.push('formGames70Min');
    }

    this.matchdays.forEach((md) => this.columns.push(md));

    if (this.config.myTeamPlayersIds) {
      this.columns.push('myteam');
    }

    // this.columns.push('OP');
  }
}
