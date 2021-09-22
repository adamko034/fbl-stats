import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { LeadersStore } from 'src/app/store/leaders/leaders.store';
import { LeadersMatchday } from 'src/app/store/leaders/models/leaders-matchday.model';

@Injectable()
export class LeadersTop100Resolver implements Resolve<LeadersMatchday> {
  constructor(private store: LeadersStore) {}

  public resolve(): Observable<LeadersMatchday> {
    return this.store.selectTop100().pipe(first());
  }
}
