import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { AdminMatchdayTipsOurPicksLoader } from '../loaders/admin-matchday-tips-our-picks.loader';
import { AdminMatchdayTipsOurPicksMatchday } from '../models/admin-matchday-tips-our-picks.model';

@Injectable()
export class AdminMatchdayTipsOurPicksResolver implements Resolve<AdminMatchdayTipsOurPicksMatchday> {
  constructor(private adminOurPicksLoader: AdminMatchdayTipsOurPicksLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<AdminMatchdayTipsOurPicksMatchday> {
    const matchday = +route.params.matchday;
    //const matchday = environment.production ? +route.params.matchday : 100;
    Logger.logDev('admin our picks players resolver, resolving for matchday');

    return this.adminOurPicksLoader.load(matchday).pipe(first());
  }
}
