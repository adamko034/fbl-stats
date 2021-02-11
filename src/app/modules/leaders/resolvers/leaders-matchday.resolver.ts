import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { LeadersStore } from 'src/app/store/leaders/leaders.store';
import { LeadersMatchday } from 'src/app/store/leaders/models/leaders-matchday.model';

@Injectable()
export class LeadersMatchdayResolver implements Resolve<LeadersMatchday> {
  constructor(private store: LeadersStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<LeadersMatchday> {
    return this.store.selectLeadersMatchday(route.params.matchday).pipe(first());
  }
}
