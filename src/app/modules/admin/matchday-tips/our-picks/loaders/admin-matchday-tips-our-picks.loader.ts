import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MatchdayTipsOurPicksPlayersLoader } from 'src/app/modules/core/matchday-tips/our-picks/loaders/matchday-tips-our-picks-players.loader';
import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';
import { AdminMatchdayTipsOurPicksMatchday } from '../models/admin-matchday-tips-our-picks.model';

@Injectable()
export class AdminMatchdayTipsOurPicksLoader {
  constructor(private ourPicksLoader: MatchdayTipsOurPicksPlayersLoader) {}

  public load(matchday: number): Observable<AdminMatchdayTipsOurPicksMatchday> {
    return this.ourPicksLoader.load(matchday).pipe(
      map((ourPicks) => this.prepareAdminOurPicksState(ourPicks)),
      first()
    );
  }

  private prepareAdminOurPicksState(ourPicks: MatchdayTipsOurPicksPlayers): AdminMatchdayTipsOurPicksMatchday {
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
