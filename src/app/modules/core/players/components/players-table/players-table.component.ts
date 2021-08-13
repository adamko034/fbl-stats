import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersDisplaySettings } from 'src/app/modules/core/players/models/players-display-settings.model';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Game } from 'src/app/store/players/models/game.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss']
})
export class PlayersTableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() players: PlayerUi[];
  @Input() showAddToMyTeamButton = false;
  @Input() showDeleteFromMyTeamButton = false;

  @ViewChild(MatSort) sort: MatSort;

  public readonly DISPLAY_KEY = 'table';
  private destroyed$ = new Subject<void>();

  public columns = [];
  public displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<any>;
  public myTeamPlayers$: Observable<string[]>;
  public lastMatchday = 0;
  public includeGames = 0;

  constructor(
    private myTeamService: MyTeamStore,
    private playersDataService: PlayersDataService,
    private displaySettingsService: PlayersDisplaySettingsService
  ) {}

  public ngOnChanges(change: SimpleChanges) {
    if (!!change.players && !change.players.isFirstChange()) {
      this.dataSource.data = this.getDataSourceData();
      this.dataSource.paginator?.firstPage();
    }
  }

  ngOnInit() {
    Logger.logDev('players table componenet, on init');
    this.myTeamPlayers$ = this.myTeamService.selectPlayersId();
  }

  public ngAfterViewInit(): void {
    this.displaySettingsService.select(this.DISPLAY_KEY).subscribe((settings) => {
      this.prepareDataSource(settings);
    });
  }

  public ngOnDestroy(): void {
    Logger.logDev('players table componenet, on destroy');
    this.destroyed$.next();
  }

  public getTdClass(column: { displayName: string; fieldName: string }, item: any): string {
    if (column.displayName.includes('MD')) {
      return `points-${this.playersDataService.getPointsColor(item[column.fieldName])}`;
    }

    if (column.displayName.includes('Form')) {
      return 'total-points';
    }
  }

  public getValue(item: any, column: { displayName: string; fieldName: string }): string {
    if (column.displayName.startsWith('MD') && !item[column.fieldName]) {
      return 'x';
    }

    return item[column.fieldName];
  }

  public trackColumnsBy(index, column: string): string {
    return column;
  }

  public addToMyTeam(playerId: string): void {
    this.myTeamService.add(playerId);
  }

  public removeFromMyTeam(playerId: string): void {
    this.myTeamService.remove(playerId);
  }

  private prepareDataSource(settings: PlayersDisplaySettings): void {
    Logger.logDev('players table componenet, preparing data source');

    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = settings.paginator;
      this.dataSource.filterPredicate = (data, filter) =>
        !!filter && data.name.toLowerCase().includes(filter.toLowerCase());
      this.dataSource.data = this.getDataSourceData();
      this.sort.sortChange.pipe(takeUntil(this.destroyed$)).subscribe(() => this.dataSource.paginator.firstPage());
    }

    this.dataSource.filter = settings.searchTerm;
    this.dataSource.paginator?.firstPage();
  }

  private getDataSourceData(): any[] {
    let data = [];

    if (!!this.players && this.players.length > 0) {
      data = this.playersDataService.flatten(this.players);
      const exPlayer = this.players[0];
      this.lastMatchday =
        !!exPlayer.games && exPlayer.games.length > 0
          ? new ArrayStream<Game>(exPlayer.games).maxBy((g) => g.matchday)
          : 0;
      this.includeGames = exPlayer.games.length;
    }

    this.prepareTableColumns(this.lastMatchday);
    return data;
  }

  private prepareTableColumns(lastMatchday: number): void {
    this.columns = this.getDefaulColumns();
    for (let i = lastMatchday; i > lastMatchday - this.includeGames; i--) {
      if (i > 0) {
        this.columns.push({ displayName: `MD ${i}`, fieldName: i.toString() });
      }
    }

    this.displayedColumns = this.columns.map((c) => c.fieldName);
    this.displayedColumns.unshift('Team');
    this.displayedColumns.unshift('Position');
    this.displayedColumns.unshift('Name');
    this.displayedColumns.unshift('No');
    this.displayedColumns.splice(4, 0, 'Next');
    this.displayedColumns.splice(5, 0, 'Prediction');
    this.displayedColumns.push('MT');
    this.displayedColumns.push('OP');
  }

  private getDefaulColumns() {
    return [
      { displayName: 'Price', fieldName: 'price' },
      { displayName: '%', fieldName: 'popularity' },
      { displayName: 'TP', fieldName: 'totalPoints' },
      { displayName: 'Avg', fieldName: 'avgPoints' },
      { displayName: 'Form', fieldName: 'form' }
    ];
  }
}
