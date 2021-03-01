import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { Logger } from 'src/app/utils/logger';
import { environment } from 'src/environments/environment';
import { OurPicksPlayersLoader } from '../../core/our-picks/loaders/our-picks-players.loader';
import { OurPicksPlayer } from '../../core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from '../../core/our-picks/models/our-picks-players.model';
import { AdminOurPicksState } from '../our-picks/models/admin-our-picks-state.model';

@Injectable()
export class AdminOurPicksResolver implements Resolve<AdminOurPicksState> {
  constructor(private ourPicksLoader: OurPicksPlayersLoader, private propertiesService: PropertiesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<AdminOurPicksState> {
    const matchday = environment.production ? +route.params.matchday : 100;
    Logger.logDev('admin our picks players resolver, resolving for matchday');

    return this.propertiesService.selectLastMatchday().pipe(
      switchMap((lastMatchday) => this.ourPicksLoader.load(matchday, lastMatchday)),
      map((ourPicks) => this.prepareAdminOurPicksState(ourPicks)),
      first()
    );
  }

  private prepareAdminOurPicksState(ourPicks: OurPicksPlayers): AdminOurPicksState {
    return {
      ourPicks: { ...ourPicks, players: [...ourPicks?.players] },
      bargains: [...ourPicks?.players.filter((m) => m.isBargain).map((p) => p.playerId)],
      differentials: [...ourPicks?.players.filter((m) => m.isDifferential).map((p) => p.playerId)],
      mustHave: [...ourPicks?.players.filter((m) => m.isMustHave).map((p) => p.playerId)],
      premium: [...ourPicks?.players.filter((m) => m.isPremium).map((p) => p.playerId)]
    };
  }
}
