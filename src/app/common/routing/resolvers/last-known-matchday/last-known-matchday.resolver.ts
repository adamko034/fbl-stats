import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Injectable()
export class LastKnownMatchdayResolver implements Resolve<number> {
  constructor(private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<number> {
    return this.propertiesStore.selectLastKnownMatchday().pipe(first());
  }
}
