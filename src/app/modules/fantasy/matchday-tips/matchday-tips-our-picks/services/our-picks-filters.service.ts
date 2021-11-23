import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { OurPicksFilters } from '../models/our-picks-filters.model';

@Injectable()
export class OurPicksFiltersService {
  private filters: OurPicksFilters = {};
  private filters$ = new ReplaySubject<OurPicksFilters>(1);

  public selectAll(): Observable<OurPicksFilters> {
    return this.filters$.pipe(startWith({}));
  }

  public updatePosition(newPosition: PlayerPosition): void {
    this.filters.position = newPosition;
    this.send();
  }

  public updateTypes(newTypes: OurPicksType[]): void {
    this.filters.types = newTypes;
    this.send();
  }

  private send(): void {
    this.filters$.next({ ...this.filters });
  }
}
