import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { OurPick } from 'src/app/store/our-picks/models/our-pick.model';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';
import { OurPicksStore } from 'src/app/store/our-picks/our-picks.store';
import { Logger } from 'src/app/utils/logger';
import { OurPicksPlayer } from '../models/our-picks-player.model';
import { OurPicksPlayers } from '../models/our-picks-players.model';
import { OurPicksPlayerLoader } from './our-picks-player.loader';

@Injectable({ providedIn: 'root' })
export class OurPicksPlayersLoader {
  private cache: { [matchday: number]: OurPicksPlayers } = {};

  constructor(private ourPicksStore: OurPicksStore, private ourPicksPlayerLoader: OurPicksPlayerLoader) {}

  public load(matchday: number, lastMatchday: number): Observable<OurPicksPlayers> {
    Logger.logDev('our picks players loader, loading for MD ' + matchday);

    if (!!this.cache[matchday]) {
      Logger.logDev('our picks players loader, returning cached data');
      return of(this.cache[matchday]).pipe(first());
    }

    return this.ourPicksStore.select(matchday).pipe(
      map((ourPicks: OurPicks) => {
        if (!ourPicks) {
          return null;
        }

        const value: OurPicksPlayers = {
          matchday,
          published: ourPicks.published,
          players: this.getPlayers(ourPicks, lastMatchday)
        };

        this.cache[matchday] = value;
        return value;
      }),
      first()
    );
  }

  private getPlayers(picks: OurPicks, lastMatchday: number): OurPicksPlayer[] {
    if (!picks || !picks.players) {
      return [];
    }

    return picks.players.map((pick: OurPick) =>
      this.ourPicksPlayerLoader.load(pick.playerId, lastMatchday, pick.order, picks)
    );
  }
}
