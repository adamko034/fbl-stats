import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { LeadersStore } from 'src/app/store/leaders/leaders.store';

@Injectable()
export class LeadersMatchdaysNumbersResolver implements Resolve<number[]> {
  constructor(private store: LeadersStore) {}

  public resolve(): Observable<number[]> {
    return this.store.selectMatchdayNumbers().pipe(first());
  }
}
