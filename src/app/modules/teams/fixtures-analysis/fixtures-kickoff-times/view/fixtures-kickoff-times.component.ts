import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-fixtures-kickoff-times',
  templateUrl: './fixtures-kickoff-times.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesKickoffTimesComponent implements OnInit {
  // public state$: Observable<FixturesKickoffTimesState>;

  // private _matrixConfig: MatrixTableConfig = { autoSetColor: true, max: 7 };
  // public get matrixConfig(): MatrixTableConfig {
  //   return this._matrixConfig;
  // }
  private _teams$: Observable<Team[]>;
  public get teams$(): Observable<Team[]> {
    return this._teams$;
  }

  private _lastMatchday$: Observable<number>;
  public get lastMatchday$(): Observable<number> {
    return this._lastMatchday$;
  }

  private _lastKnownMatchday$: Observable<number>;
  public get lastKnownMatchday$(): Observable<number> {
    return this._lastKnownMatchday$;
  }

  constructor(
    private _route: ActivatedRoute // private filtersService: FixturesKickoffTimesFiltersService, // private route: ActivatedRoute, // private stateFabric: FixturesKickoffTimesStateFabric
  ) {}

  ngOnInit(): void {
    this._lastMatchday$ = this._route.data.pipe(map((data) => data.properties.lastMatchday));
    this._lastKnownMatchday$ = this._route.data.pipe(map((data) => data.properties.lastKnownMatchday));
    this._teams$ = this._route.data.pipe(map((data) => data.teams));
    // this.state$ = combineLatest([this.route.data, this.route.queryParams]).pipe(
    //   map(([data, queryParams]) => {
    //     const filters = this.filtersService.fromQueryParams(queryParams);
    //     const { teams, lastMatchday } = data;
    //     return this.stateFabric.from(teams, lastMatchday + 1, filters);
    //   })
    // );
  }
}
