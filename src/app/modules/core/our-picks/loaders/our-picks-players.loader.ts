import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MatchdayTipsOurPicksStore } from 'src/app/store/matchday-tips/our-picks/matchday-tips-our-picks.store';
import { MatchdayTipOurPick } from 'src/app/store/matchday-tips/our-picks/models/matchday-tips-our-pick.model';
import { MatchdayTipsOurPick } from 'src/app/store/matchday-tips/our-picks/models/matchday-tips-our-picks.model';
import { Logger } from 'src/app/utils/logger';
import { OurPicksPlayer } from '../models/our-picks-player.model';
import { OurPicksPlayers } from '../models/our-picks-players.model';
import { OurPicksPlayerLoader } from './our-picks-player.loader';

@Injectable({ providedIn: 'root' })
export class OurPicksPlayersLoader {
  private cache: { [matchday: number]: OurPicksPlayers } = {};

  constructor(private ourPicksStore: MatchdayTipsOurPicksStore, private ourPicksPlayerLoader: OurPicksPlayerLoader) {}

  public load(matchday: number): Observable<OurPicksPlayers> {
    Logger.logDev('our picks players loader, loading for MD ' + matchday);

    if (!!this.cache[matchday]) {
      Logger.logDev(`our picks players loader, returning cached data: ${this.cache[matchday].players.length} players`);
      return of(this.cache[matchday]).pipe(first());
    }

    return this.ourPicksStore.select(matchday).pipe(
      map((ourPicks: MatchdayTipsOurPick) => {
        if (!ourPicks) {
          Logger.logDev(`our picks players loader, no our picks, returning null`);
          return null;
        }

        const value: OurPicksPlayers = {
          matchday,
          published: ourPicks.published,
          players: this.getPlayers(ourPicks, matchday)
        };

        this.cache[matchday] = value;

        Logger.logDev(`our picks players loader, returning ${value.players.length} players`);
        return value;
      }),
      first()
    );
  }

  private getPlayers(picks: MatchdayTipsOurPick, matchday: number): OurPicksPlayer[] {
    if (!picks || !picks.players) {
      return [];
    }

    return picks.players.map((pick: MatchdayTipOurPick) =>
      this.ourPicksPlayerLoader.load(pick.playerId, matchday - 1, pick.order, picks)
    );
  }
}
