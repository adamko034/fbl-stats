import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { maxBy } from 'lodash';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
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
export class PlayersTableComponent implements OnInit {
  @Input() set players(playersUi: PlayerUi[]) {
    Logger.logDev('players table component, setting players, calculating data');
    this.preparePlayersData(playersUi);
  }

  public columns = [];
  public displayedColumns: string[];
  public show = false;
  public data: any[] = [];

  public expandedRows: { [key: string]: boolean } = {};

  constructor(private playersDataService: PlayersDataService, private expandedPlayersService: ExpandedPlayersService) {}

  ngOnInit() {
    Logger.logDev('players table componenet, on init');
    this.expandedPlayersService.select().subscribe((expanedPlayers) => (this.expandedRows = expanedPlayers));
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
