import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { distinctUntilChanged, first, takeUntil, tap } from 'rxjs/operators';
import { Game } from 'src/app/models/game.model';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersDisplaySettings } from 'src/app/modules/core/players/models/players-display-settings.model';
import { ExpandedPlayersService } from 'src/app/modules/core/players/services/expanded-players.service';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';
import { PlayersDataService } from 'src/app/modules/players/views/players-fantasy/components/players-table-container/services/players-data.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Logger } from 'src/app/utils/logger';
import { AuthenticationService } from '../../../services/authentication.service';
import { OurPicksAdminService } from '../../../services/our-picks-admin.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
  providers: [ExpandedPlayersService],
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('0.3s ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('0.3s ease-out', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class PlayersTableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() players: PlayerUi[];
  @Input() showAddToMyTeamButton = false;
  @Input() showDeleteFromMyTeamButton = false;

  @ViewChild(MatSort) sort: MatSort;

  public readonly DISPLAY_KEY = 'table';
  private destroyed$ = new Subject<void>();

  public columns = [];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;
  public myTeamPlayers$: Observable<string[]>;

  public expandedRows: { [key: string]: boolean } = {};
  public isLogged = false;

  constructor(
    private myTeamService: MyTeamStore,
    private playersDataService: PlayersDataService,
    private expandedPlayersService: ExpandedPlayersService,
    private displaySettingsService: PlayersDisplaySettingsService,
    private auth: AuthenticationService,
    private changeDetection: ChangeDetectorRef,
    private ourPicksAdminService: OurPicksAdminService
  ) {}

  public ngOnChanges(change: SimpleChanges) {
    if (!!change.players && !change.players.isFirstChange()) {
      this.dataSource.data = this.getDataSourceData();
      this.dataSource.paginator?.firstPage();
    }
  }

  ngOnInit() {
    Logger.logDev('players table componenet, on init');
    this.expandedPlayersService.select().subscribe((expanedPlayers) => (this.expandedRows = expanedPlayers));
    this.myTeamPlayers$ = this.myTeamService.selectPlayersId();
    // this.auth
    //   .isLogged()
    //   .pipe(distinctUntilChanged())
    //   .subscribe((res) => {
    //     this.isLogged = res.isLogged;
    //     if (this.isLogged) {
    //       if (!this.displayedColumns.includes('OP')) {
    //         this.displayedColumns.push('OP');
    //         this.changeDetection.detectChanges();
    //       }
    //     } else {
    //       this.displayedColumns = this.displayedColumns.filter((x) => x !== 'OP');
    //     }
    //   });
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

  public trackColumnsBy(index, column: string): string {
    return column;
  }

  public toggleExpandedPlayer(playerId: string) {
    this.expandedPlayersService.toggleExpand(playerId);
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
      const lastMatchday = new ArrayStream<Game>(exPlayer.games).maxBy((g) => g.matchday);
      const includedMatchdays = exPlayer.games.length;

      this.prepareTableColumns(lastMatchday, includedMatchdays);
    }

    return data;
  }

  private prepareTableColumns(lastMatchday: number, matchdays: number): void {
    this.columns = this.getDefaulColumns();
    for (let i = lastMatchday; i > lastMatchday - matchdays; i--) {
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
      { displayName: 'Form', fieldName: 'form' }
    ];
  }
}
