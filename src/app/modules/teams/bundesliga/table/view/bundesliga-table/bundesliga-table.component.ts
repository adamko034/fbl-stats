import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamsBundesligaTableFilters } from '../../models/teams-bundesliga-table-filters.model';
import { TeamsBundesligaTableTeam } from '../../models/teams-bundesliga-table-team.model';
import { TeamsBundesligaTableQueryParamsService } from '../../resolvers/teams-bundesliga-table-query-params.service';

@Component({
  selector: 'app-bundesliga-table',
  templateUrl: './bundesliga-table.component.html',
  styleUrls: ['./bundesliga-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableComponent implements OnInit {
  public teams$: Observable<TeamsBundesligaTableTeam[]>;
  public filters$: Observable<TeamsBundesligaTableFilters>;

  constructor(private route: ActivatedRoute, private queryParamsService: TeamsBundesligaTableQueryParamsService) {}

  public ngOnInit(): void {
    this.teams$ = this.route.data.pipe(map((data) => data.teams));
    this.filters$ = this.route.queryParams.pipe(map((queryParams) => this.queryParamsService.getFilters(queryParams)));
  }
}
