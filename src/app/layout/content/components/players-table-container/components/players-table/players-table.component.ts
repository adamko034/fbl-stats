import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { maxBy } from 'lodash';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class PlayersTableComponent implements OnInit, OnChanges {
  @Input() players: PlayerUi[];

  public playerTimelineOptions: TimelineDisplayOptions = { pastItemsCount: 3, futureItemsCount: 2 };
  public columns = [];
  public displayedColumns: string[];
  public show = false;
  public data: any[] = [];

  public expandedRows: { [key: string]: boolean } = {};

  constructor(private playersDataService: PlayersDataService, private expandedPlayersService: ExpandedPlayersService) {}

  ngOnInit() {
    this.expandedPlayersService.select().subscribe((expanedPlayers) => (this.expandedRows = expanedPlayers));
  }

  public ngOnChanges() {
    this.data = [];
    if (!!this.players && this.players.length > 0) {
      this.data = this.playersDataService.flatten(this.players);

      const exPlayer = this.players[0];
      const lastMatchday = maxBy(exPlayer.games, 'matchday').matchday;
      const includedMatchdays = exPlayer.games.length;

      this.prepareTableColumns(lastMatchday, includedMatchdays);
    }
  }

  public getTdClass(column: { displayName: string; fieldName: string }, item: any): string {
    if (column.displayName.includes('MD')) {
      return `points-${this.playersDataService.getPointsColor(item[column.fieldName])}`;
    }

    if (column.displayName.includes('Form')) {
      return 'total-points';
    }
  }

  public toggleExpandedPlayer(playerId: string) {
    this.expandedPlayersService.toggleExpand(playerId);
  }

  private prepareTableColumns(lastMatchday: number, matchdays: number): void {
    this.columns = this.getDefaulColumns();
    for (let i = lastMatchday; i > lastMatchday - matchdays; i--) {
      if (i > 0) {
        this.columns.push({ displayName: `MD ${i}`, fieldName: i.toString() });
      }
    }

    this.displayedColumns = this.columns.map((c) => c.fieldName);
    this.displayedColumns.unshift('Name');
    this.show = true;
  }

  private getDefaulColumns() {
    return [
      { displayName: 'Team', fieldName: 'team' },
      { displayName: 'Price', fieldName: 'price' },
      { displayName: '%', fieldName: 'popularity' },
      { displayName: 'Total Points', fieldName: 'totalPoints' },
      { displayName: 'Form', fieldName: 'form' }
    ];
  }
}
