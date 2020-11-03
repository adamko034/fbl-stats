import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { maxBy } from 'lodash';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss']
})
export class PlayersTableComponent implements OnInit, OnChanges {
  @Input() players: PlayerUi[];

  public columns = [];
  public displayedColumns: string[];
  public show = false;
  public data: any[] = [];

  constructor(private playersDataService: PlayersDataService) {}

  ngOnInit() {}

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
