import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { PlayersCompareFixturesFilters } from '../models/players-compare-fixtures-filters.model';

@Injectable()
export class PlayersCompareFiltersService {
  private _fitlers: PlayersCompareFixturesFilters = { includeMatchdays: 0, includePastMatchdays: 4 };

  private filters$: ReplaySubject<PlayersCompareFixturesFilters>;

  constructor(private unlimitedTransfersService: UnlimitedTransfersService) {
    this.filters$ = new ReplaySubject<PlayersCompareFixturesFilters>(1);

    this.unlimitedTransfersService.matchdaysUntilNext.pipe(first()).subscribe((mds) => {
      this._fitlers.includeMatchdays = mds;
      this.send();
    });
  }

  public selectFilters(): Observable<PlayersCompareFixturesFilters> {
    return this.filters$.asObservable();
  }

  public updateIncludeMatchdays(mds: number): void {
    this._fitlers.includeMatchdays = mds;
    this.send();
  }

  public updateIncludePastMatchdays(mds: number): void {
    this._fitlers.includePastMatchdays = mds;
    this.send();
  }

  private send(): void {
    this.filters$.next({ ...this._fitlers });
  }
}
