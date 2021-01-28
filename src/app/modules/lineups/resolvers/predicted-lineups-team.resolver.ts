import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { TeamPredictedLineups } from 'src/app/modules/lineups/store/models/team-predicted-lineups.model';
import { PredictedLineupsStore } from 'src/app/modules/lineups/store/predicted-lineups.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PredictedLineupTeamResolver implements Resolve<TeamPredictedLineups> {
  constructor(private store: PredictedLineupsStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<TeamPredictedLineups> {
    Logger.logDev('prediced lineups team resolver, resolving for team ' + route.params.team);
    return this.store.selectByTeam(route.params.team).pipe(first());
  }
}
