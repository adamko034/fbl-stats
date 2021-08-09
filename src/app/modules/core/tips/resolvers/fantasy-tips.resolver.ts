import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { FantasyTipsStore } from 'src/app/store/tips/fantasy-tips.store';
import { FantasyTips } from 'src/app/store/tips/models/fantasy-tips.model';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class FantasyTipsResolver implements Resolve<Observable<FantasyTips>> {
  constructor(private propertiesStore: PropertiesStore, private fantasyTipsStore: FantasyTipsStore) {}

  public resolve(): Observable<FantasyTips> {
    return this.propertiesStore.selectLastMatchday().pipe(
      tap((lastMatchday) => Logger.logDev(`fantasy tips resolver: resolving for matchday ${lastMatchday + 1}`)),
      switchMap((lastMachday) => this.fantasyTipsStore.select(lastMachday + 1)),
      first()
    );
  }
}
