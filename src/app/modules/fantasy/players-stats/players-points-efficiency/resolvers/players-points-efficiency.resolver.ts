import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { PlayerPointsEfficiency } from '../models/player-points-efficiency.model';
import { PlayersPointsEfficiencyType } from '../models/players-points-efficiency-type.enum';
import { PlayersPointsEfficiencyLoader } from './players-points-efficiency.loader';

@Injectable()
export class PlayersPointsEffciencyResolver implements Resolve<PlayerPointsEfficiency[]> {
  constructor(private loader: PlayersPointsEfficiencyLoader) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<PlayerPointsEfficiency[]> {
    let orderBy: number = +route.queryParams.orderBy;
    let position: string = route.queryParams.position;
    let type: PlayersPointsEfficiencyType = route.params.type || PlayersPointsEfficiencyType.OVERALL;

    if (isNaN(+orderBy) || (orderBy !== 5 && orderBy !== 10 && orderBy !== 15 && orderBy !== 20)) {
      orderBy = 10;
    }

    Logger.logDev('players list scoring chances resolver: ' + orderBy + ' type: ' + type);
    return this.loader.load(orderBy, type, position).pipe(first());
  }
}
