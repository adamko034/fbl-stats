import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BundesligaTableState } from 'src/app/common/teams/bundesliga-table/models/bundesliga-table-state';
import { BundesligaTableConfig } from 'src/app/common/teams/bundesliga-table/models/state/bundesliga-table-config';
import { TeamsBundesligaTableTeamsConverter } from '../converters/teams-bundesliga-table-teams.converter';

@Component({
  selector: 'app-teams-bundesliga-table',
  templateUrl: './teams-bundesliga-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsBundesligaTableComponent implements OnInit {
  private _bundesligaTableConfig: BundesligaTableConfig = { showTitle: false, showVenueFilter: true };

  public state$: Observable<BundesligaTableState>;

  constructor(private _route: ActivatedRoute, private _converter: TeamsBundesligaTableTeamsConverter) {}

  public ngOnInit(): void {
    this.state$ = this._route.data.pipe(
      map(({ teams, lastMatchday, selectedTeams }) => {
        return {
          teams: this._converter.convert(teams),
          lastMatchday,
          config: this._bundesligaTableConfig,
          selectedTeams
        };
      })
    );
  }
}
