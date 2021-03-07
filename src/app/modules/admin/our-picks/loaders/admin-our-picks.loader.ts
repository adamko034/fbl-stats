import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { OurPicksPlayersLoader } from 'src/app/modules/core/our-picks/loaders/our-picks-players.loader';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { AdminOurPicksMatchday } from '../models/admin-our-picks-matchday.model';

@Injectable()
export class AdminOurPicksLoader {
  constructor(private ourPicksLoader: OurPicksPlayersLoader) {}

  public load(matchday: number): Observable<AdminOurPicksMatchday> {
    return this.ourPicksLoader.load(matchday).pipe(
      map((ourPicks) => this.prepareAdminOurPicksState(ourPicks)),
      first()
    );
  }

  private prepareAdminOurPicksState(ourPicks: OurPicksPlayers): AdminOurPicksMatchday {
    return {
      ourPicks: { ...ourPicks, players: [...ourPicks?.players] },
      bargains: [...ourPicks?.players.filter((m) => m.isBargain).map((p) => p.playerId)],
      differentials: [...ourPicks?.players.filter((m) => m.isDifferential).map((p) => p.playerId)],
      mustHave: [...ourPicks?.players.filter((m) => m.isMustHave).map((p) => p.playerId)],
      premium: [...ourPicks?.players.filter((m) => m.isPremium).map((p) => p.playerId)],
      surprising: [...ourPicks?.players.filter((m) => m.isSurprising).map((p) => p.playerId)]
    };
  }
}
