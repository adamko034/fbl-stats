import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { TeamNavigation } from 'src/app/store/properties/properties.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Injectable({ providedIn: 'root' })
export class TeamsNavigationResolver implements Resolve<Observable<TeamNavigation[]>> {
  constructor(private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<TeamNavigation[]> {
    return this.propertiesStore.selectTeamsNavigation().pipe(first());
  }
}
