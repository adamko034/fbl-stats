import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { maxBy } from 'lodash';
import { Observable } from 'rxjs';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { ExpandedPlayersService } from 'src/app/modules/core/players/services/expanded-players.service';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';
import { Logger } from 'src/app/utils/logger';

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
export class PlayersTableComponent implements OnInit, AfterViewInit {
  @Input() set players(playersUi: PlayerUi[]) {
    Logger.logDev('players table component, setting players, calculating data');
    this.preparePlayersData(playersUi);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  @Input() showAddToMyTeamButton = false;
  @Input() showDeleteFromMyTeamButton = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public columns = [];
  public displayedColumns: string[];
  public show = false;
  public data: any[] = [];
  public dataSource: MatTableDataSource<any>;
  public myTeamPlayers$: Observable<string[]>;

  public expandedRows: { [key: string]: boolean } = {};

  constructor(
    private myTeamService: MyTeamStore,
    private playersDataService: PlayersDataService,
    private expandedPlayersService: ExpandedPlayersService
  ) {}

  ngOnInit() {
    Logger.logDev('players table componenet, on init');
    this.expandedPlayersService.select().subscribe((expanedPlayers) => (this.expandedRows = expanedPlayers));
    this.myTeamPlayers$ = this.myTeamService.selectPlayersId();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  private preparePlayersData(playersUi: PlayerUi[]) {
    this.data = [];

    if (!!playersUi && playersUi.length > 0) {
      this.data = this.playersDataService.flatten(playersUi);
      const exPlayer = playersUi[0];
      const lastMatchday = maxBy(exPlayer.games, 'matchday').matchday;
      const includedMatchdays = exPlayer.games.length;

      this.prepareTableColumns(lastMatchday, includedMatchdays);
    }
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
    this.displayedColumns.splice(3, 0, 'Next');
    this.displayedColumns.push('MT');
    this.show = true;
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
