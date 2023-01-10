import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Venue } from 'src/app/shared/models/venue.enum';
import { Logger } from 'src/app/utils/logger';
import { BundesligaTableState } from '../models/bundesliga-table-state';
import { BundesligaTableFilters } from '../models/internal/bundesliga-table-filters';
import { BundesligaTableTeamResult } from '../models/internal/bundesliga-table-team-result';
import { BundesligaTableResultsCalculator } from '../services/bundsliga-table-results-calculator.service';

@Component({
  selector: 'app-bundesliga-table',
  templateUrl: './bundesliga-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableComponent implements OnInit, OnChanges {
  @Input() state: BundesligaTableState;

  private _filters: BundesligaTableFilters;
  private _filters$: Observable<BundesligaTableFilters>;
  public get filters$(): Observable<BundesligaTableFilters> {
    return this._filters$;
  }

  private _results: BundesligaTableTeamResult[];
  public get results(): BundesligaTableTeamResult[] {
    return this._results;
  }

  public get title(): string {
    return `Bundesliga Table ${this.state.season}`;
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _resultsCalculator: BundesligaTableResultsCalculator
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.state && !changes.state.isFirstChange() && !!this._filters) {
      Logger.logDev(`bundesliga table component: on changes, recalculating data`);
      this._results = this._resultsCalculator.calculate(this.state.teams, this._filters, this.state.lastMatchday);
    }
  }

  public ngOnInit(): void {
    Logger.logDev('bundesliga table component: on init');
    this._filters$ = this._route.queryParams.pipe(
      filter((params) => !!params && Object.keys(params).length > 0),
      map(({ venue, matchdays }) => {
        return {
          venue: venue ?? Venue.ALL,
          matchdays: isNaN(matchdays) ? this.state.lastMatchday : +matchdays
        };
      }),
      startWith({ venue: Venue.ALL, matchdays: this.state.lastMatchday }),
      tap((filters) => {
        this._filters = filters;
        Logger.logDev(`bundesliga table component: calculating data, filters: ${JSON.stringify(filters)}`);
        this._results = this._resultsCalculator.calculate(this.state.teams, filters, this.state.lastMatchday);
      })
    );
  }

  public onVenueChange(venue: Venue): void {
    this._router.navigate([], { queryParams: { venue }, queryParamsHandling: 'merge' });
  }

  public onMatchdaysChange(matchdays: number): void {
    this._router.navigate([], {
      queryParams: { matchdays },
      queryParamsHandling: 'merge'
    });
  }
}
