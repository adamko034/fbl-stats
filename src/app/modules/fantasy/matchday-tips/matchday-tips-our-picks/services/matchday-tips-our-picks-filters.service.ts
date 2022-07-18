import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Position } from 'src/app/common/players/models/position.enum';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { MatchdayTipsOurPicksFilters } from '../models/matchday-tips-our-picks-filters.model';

@Injectable()
export class MatchdayTipsOurPicksFiltersService {
  private filters: MatchdayTipsOurPicksFilters = {};
  private filters$ = new ReplaySubject<MatchdayTipsOurPicksFilters>(1);

  public selectAll(): Observable<MatchdayTipsOurPicksFilters> {
    return this.filters$.pipe(startWith({}));
  }

  public updatePosition(newPosition: Position): void {
    this.filters.position = newPosition;
    this.send();
  }

  public updateTypes(newTypes: MatchdayTipsOurPicksType[]): void {
    this.filters.types = newTypes;
    this.send();
  }

  private send(): void {
    this.filters$.next({ ...this.filters });
  }
}
