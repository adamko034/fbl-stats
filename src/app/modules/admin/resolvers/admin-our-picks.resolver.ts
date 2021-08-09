import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { AdminOurPicksLoader } from '../our-picks/loaders/admin-our-picks.loader';
import { AdminOurPicksMatchday } from '../our-picks/models/admin-our-picks-matchday.model';

@Injectable()
export class AdminOurPicksResolver implements Resolve<AdminOurPicksMatchday> {
  constructor(private adminOurPicksLoader: AdminOurPicksLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<AdminOurPicksMatchday> {
    const matchday = +route.params.matchday;
    //const matchday = environment.production ? +route.params.matchday : 100;
    Logger.logDev('admin our picks players resolver, resolving for matchday');

    return this.adminOurPicksLoader.load(matchday).pipe(first());
  }
}
