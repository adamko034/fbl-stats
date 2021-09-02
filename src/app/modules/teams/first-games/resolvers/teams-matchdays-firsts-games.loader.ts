import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { TeamProperty } from 'src/app/store/teams/models/team-property.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { TeamMatchdaysFirstGames } from '../models/team-matchdays-first-games.model';

@Injectable()
export class TeamMatchdaysFirstsGamesLoader {
  constructor(private teamsStore: TeamsStore, private fixturesStore: FixturesStore) {}

  public load(showAll: boolean): Observable<TeamMatchdaysFirstGames[]> {
    Logger.logDev('team matchdays firsts games loader, loading');
    return combineLatest([this.teamsStore.selectAllNames(), this.fixturesStore.selectAll()]).pipe(
      first(),
      map(([teams, fixtures]) => {
        let includeFixtures = fixtures;

        if (!showAll) {
          includeFixtures = fixtures.filter((f) => !f.wasPlayed && f.matchdayNumber != 34);
        }

        return this.createTeamsFirstGames(teams, includeFixtures);
      })
    );
  }

  private createTeamsFirstGames(teams: TeamProperty[], fixtures: MatchdayFixtures[]): TeamMatchdaysFirstGames[] {
    const teamsFirstGames: TeamMatchdaysFirstGames[] = [];
    const confirmedFixtures = fixtures.filter((f) => f.isConfirmed);

    for (const team of teams) {
      const fixturesFirstGamesForTeam = confirmedFixtures.filter(
        (f) =>
          f.gamesPerDate[f.firstGameDate].filter(
            (x) => x.homeTeamShort.toLowerCase() === team.short || x.awayTeamShort.toLowerCase() === team.short
          ).length > 0
      );
      teamsFirstGames.push({
        teamShort: team.short,
        teamLong: team.name,
        firstGamesCount: fixturesFirstGamesForTeam.length,
        firstGamesPlayedCount: fixturesFirstGamesForTeam.filter((x) => x.wasPlayed).length,
        games: fixturesFirstGamesForTeam.map((f) => ({ matchday: f.matchdayNumber, wasPlayed: f.wasPlayed }))
      });
    }

    return teamsFirstGames;
  }
}
