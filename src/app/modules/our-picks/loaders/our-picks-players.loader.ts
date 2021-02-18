import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { OurPick } from 'src/app/store/our-picks/models/our-pick.model';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';
import { OurPicksStore } from 'src/app/store/our-picks/our-picks.store';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { OurPicksPlayerFantasyMatchday } from '../models/our-picks-player-fantasy-matchday.model';
import { OurPicksPlayerFantasy } from '../models/our-picks-player-fantasy.model';
import { OurPicksPlayerTeam } from '../models/our-picks-player-team.model';
import { OurPicksPlayer } from '../models/our-picks-player.model';
import { OurPicksPlayers } from '../models/our-picks-players.model';

@Injectable()
export class OurPicksPlayersLoader {
  constructor(
    private ourPicksStore: OurPicksStore,
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore
  ) {}

  public load(matchday: number, lastMatchday: number): Observable<OurPicksPlayers> {
    Logger.logDev('our picks players loaded, loading for MD ' + matchday);
    return this.ourPicksStore.select(matchday).pipe(
      map((ourPicks: OurPicks) => {
        if (!ourPicks) {
          return null;
        }

        return {
          matchday,
          players: this.getPlayers(ourPicks, lastMatchday)
        };
      }),
      first()
    );
  }

  private getPlayers(picks: OurPicks, lastMatchday: number): OurPicksPlayer[] {
    if (!picks || !picks.players) {
      return [];
    }

    return picks.players.map((pick: OurPick) => {
      const player = this.playersStore.getById(pick.playerId.toString());
      const team = this.teamsStore.getBy(player.teamShort);

      const fantasy: OurPicksPlayerFantasy = {
        popularity: player.popularity,
        price: player.price,
        totalPoints: player.totalPoints,
        form: this.getForm(player, lastMatchday)
      };

      const ourPicksTeam: OurPicksPlayerTeam = {
        rank: team.rank,
        teamShort: team.shortName
      };

      return {
        name: player.name,
        playerId: pick.playerId,
        order: pick.order,
        fantasy,
        team: ourPicksTeam,
        lastName: player.lastName,
        position: player.position,
        isBargain: picks.bargains.includes(pick.playerId),
        isDifferential: picks.differentials.includes(pick.playerId),
        isMustHave: picks.mustHave.includes(pick.playerId),
        isPremium: picks.premium.includes(pick.playerId)
      };
    });
  }

  private getForm(player: Player, lastMatchday: number): OurPicksPlayerFantasyMatchday[] {
    return player.games
      .filter((g) => lastMatchday - 3 < g.matchday && g.matchday <= lastMatchday)
      .map(({ matchday, points }) => ({ matchday, points }));
  }
}
