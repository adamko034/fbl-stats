import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatrixTableConfig } from 'src/app/common/components/ui/matrix-table/models/matrix-table-config.model';
import { MatrixTableRow } from 'src/app/common/components/ui/matrix-table/models/matrix-table-row.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsKickoffTimesFilters } from '../models/teams-kickoff-times-filters.model';
import { TeamsKickoffTimesFiltersService } from '../services/teams-kickoff-times-filters.service';
import { TeamsKickoffTimesMatrixTableRowsFabric } from '../services/teams-kickoff-times-matrix-table-rows.fabric';

@Component({
  selector: 'app-teams-kickoff-times',
  templateUrl: './teams-kickoff-times.component.html',
  styleUrls: ['./teams-kickoff-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsKickoffTimesComponent implements OnInit {
  @Input() teams: Team[];
  @Input() lastMatchday: number;
  @Input() lastKnownMatchday: number;

  private _filters$: Observable<TeamsKickoffTimesFilters>;
  public get filters$(): Observable<TeamsKickoffTimesFilters> {
    return this._filters$;
  }

  private _matrixTableConfig$: Observable<MatrixTableConfig>;
  public get matrixTableConfig$(): Observable<MatrixTableConfig> {
    return this._matrixTableConfig$;
  }

  private _rows$: Observable<MatrixTableRow[]>;
  public get rows$(): Observable<MatrixTableRow[]> {
    return this._rows$;
  }

  public mds: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _filtersService: TeamsKickoffTimesFiltersService,
    private _matrixRowsFabric: TeamsKickoffTimesMatrixTableRowsFabric
  ) {}

  public ngOnInit(): void {
    this._filters$ = this._route.queryParams.pipe(
      map((params) => this._filtersService.fromQueryParams(params)),
      tap(
        (params) =>
          (this.mds =
            params.matchdays === 0
              ? `${this.lastMatchday + 1} - ${this.lastKnownMatchday}`
              : `${this.lastMatchday + 1} - ${this.lastMatchday + params.matchdays}`)
      )
    );
    this._rows$ = this._filters$.pipe(map((filters) => this.getRows(filters)));
    this._matrixTableConfig$ = this._filters$.pipe(
      map((filters) => ({ mode: 'teams', autoSetColor: true, max: this.getMax(filters), showReflection: true }))
    );
  }

  private getMax(filters: TeamsKickoffTimesFilters) {
    return filters.matchdays > 0 ? filters.matchdays : this.lastKnownMatchday - this.lastMatchday;
  }

  private getRows(filters: TeamsKickoffTimesFilters): MatrixTableRow[] {
    const teamsToInclude =
      filters.teams.length == 0 ? [...this.teams] : this.teams.filter((t) => filters.teams.includes(t.shortName));
    return this._matrixRowsFabric.from(teamsToInclude, this.lastMatchday + 1, filters.matchdays);
  }
}
