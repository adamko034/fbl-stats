import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { BundesligaFixtureDetailsState } from '../../models/bundesliga-fixture-details.state';

@Injectable()
export class BundesligaFixtureDetailsResolver implements Resolve<BundesligaFixtureDetailsState> {
  constructor(private teamsStore: TeamsStore, private playersStore: PlayersStore) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<BundesligaFixtureDetailsState | undefined> {
    const { matchday, home, away } = route.params;

    if (!matchday || !home || !away) {
      return of(undefined);
    }

    return combineLatest([
      this.teamsStore.select(home),
      this.playersStore.selectAllByTeam(home),
      this.teamsStore.select(away),
      this.playersStore.selectAllByTeam(away)
    ]).pipe(
      map(([homeTeamData, homeTeamPlayers, awayTeamData, awayTeamPlayers]) => {
        if (this.dataValid(+matchday, homeTeamData, awayTeamData)) {
          return {
            homeTeam: homeTeamData,
            awayTeam: awayTeamData,
            matchday: +matchday,
            homeTeamPlayers,
            awayTeamPlayers
          };
        }

        return undefined;
      }),
      first()
    );
  }

  private dataValid(matchday: number, homeTeam: Team, awayTeam: Team): boolean {
    return (
      homeTeam.games.find((f) => f.matchday === matchday && f.isHome && f.opponent === awayTeam.shortName) !== undefined
    );
  }
}
