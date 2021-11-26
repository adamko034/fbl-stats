import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { MatchdayTipsLinksStore } from 'src/app/store/matchday-tips/links/matchday-tips-links.store';
import { MatchdaysTipsLinks } from 'src/app/store/matchday-tips/links/models/matchday-tips-links.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class MatchdayTipsLinksResolver implements Resolve<Observable<MatchdaysTipsLinks>> {
  constructor(private propertiesStore: PropertiesStore, private tipsLinksStore: MatchdayTipsLinksStore) {}

  public resolve(): Observable<MatchdaysTipsLinks> {
    return this.propertiesStore.selectLastMatchday().pipe(
      tap((lastMatchday) => Logger.logDev(`fantasy tips resolver: resolving for matchday ${lastMatchday + 1}`)),
      switchMap((lastMachday) => this.tipsLinksStore.select(lastMachday + 1)),
      first()
    );
  }
}
