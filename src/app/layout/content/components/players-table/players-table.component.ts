import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { PlayersState } from 'src/app/layout/content/models/players-state.model';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss']
})
export class PlayersTableComponent implements OnInit, OnChanges {
  @Input() players: PlayersState;
  @Input() filters: PlayersFilters;
  @Input() lastMatchday: number;

  public data: any[] = [];
  public columns = [];
  public displayedColumns: string[];
  public show = false;

  constructor() {}

  ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges) {
    this.prepareTableData();
  }

  private prepareTableData(): void {
    if (this.players && this.filters && this.players[this.filters.position]) {
      let playersToShow = this.players[this.filters.position];

      if (!!this.filters.price && this.filters.price !== -1) {
        playersToShow = playersToShow.filter((p) => p.price <= this.filters.price);
      }

      if (!!this.filters.popularity && this.filters.popularity !== -1) {
        playersToShow = playersToShow.filter((p) => p.popularity <= this.filters.popularity);
      }

      if (!!this.filters.team) {
        playersToShow = playersToShow.filter((p) => p.team.toLowerCase() === this.filters.team.toLowerCase());
      }

      this.data = playersToShow.map((player) => {
        const gamesFlatted = player.games.reduce((obj, item) => ({ ...obj, [item.matchday]: item.points }), {});
        const row = { ...player, ...gamesFlatted } as any;

        let form = 0;
        player.games
          .filter((g) => g.matchday > this.lastMatchday - this.filters.matchdays)
          .forEach((g) => (form += g.points));

        row.form = form;
        return row;
      });

      this.data = _.orderBy(this.data, ['form', this.lastMatchday], ['desc', 'desc']).slice(0, this.filters.length);

      this.columns = this.getDefaulColumns();
      this.columns.push({ displayName: 'Form', fieldName: 'form' });
      for (let i = this.lastMatchday; i > this.lastMatchday - this.filters.matchdays; i--) {
        this.columns.push({ displayName: `MD ${i}`, fieldName: i.toString() });
      }

      this.displayedColumns = this.columns.map((c) => c.fieldName);
      this.show = true;
    }
  }

  private getDefaulColumns() {
    return [
      { displayName: 'Name', fieldName: 'name' },
      { displayName: 'Team', fieldName: 'team' },
      { displayName: 'Price', fieldName: 'price' },
      { displayName: 'Popularity', fieldName: 'popularity' },
      { displayName: 'Total Points', fieldName: 'totalPoints' }
    ];
  }
}
