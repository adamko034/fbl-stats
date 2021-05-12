import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';
import { MatchdayService } from 'src/app/modules/core/matchday/services/matchday.service';
import { TeamMatchdaysFirstGames } from 'src/app/modules/teams/bundesliga/first-games/models/team-matchdays-first-games.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class TeamMatchdaysFirstsGamesLoader {
  constructor(private teamsStore: TeamsStore, private matchdayService: MatchdayService) {}

  public load(): Observable<TeamMatchdaysFirstGames[]> {
    Logger.logDev('team matchdays firsts games loader, loading');
    return this.teamsStore.selectAll().pipe(
      map((teams: Team[]) => this.createTeamsFirstsGames(teams)),
      first()
    );
  }

  public createTeamsFirstsGames(teams: Team[]): TeamMatchdaysFirstGames[] {
    const matchdaysFirstFixtures = this.matchdayService.getMatchdaysFirstGames(teams, 1);

    if (!matchdaysFirstFixtures) {
      return [];
    }

    return teams.map((team: Team) => {
      const teamFirstGames = matchdaysFirstFixtures.filter((m) =>
        this.fixturesContainsTeam(m.fixtures, team.shortName)
      );
      return {
        games: teamFirstGames.map((g) => ({ matchday: g.matchday, wasPlayed: g.wasPlayed })),
        teamLong: team.name,
        teamShort: team.shortName,
        firstGamesCount: teamFirstGames.length,
        firstGamesPlayedCount: teamFirstGames.filter((g) => g.wasPlayed).length
      };
    });
  }

  private fixturesContainsTeam(fixtures: MatchdayFixture[], teamShort: string): boolean {
    return fixtures.some(
      (f) =>
        f.homeShort.toLowerCase() === teamShort.toLowerCase() || f.awayShort.toLowerCase() === teamShort.toLowerCase()
    );
  }
}
