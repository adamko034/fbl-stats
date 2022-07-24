import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { History } from 'src/app/store/history/models/history.model';

@Injectable()
export class HistorySeasonChildResolver implements Resolve<History> {
  public resolve(route: ActivatedRouteSnapshot): History {
    return route.parent.parent.data.history;
  }
}
