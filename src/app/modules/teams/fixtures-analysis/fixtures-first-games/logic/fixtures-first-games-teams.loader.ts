import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';
import { FixturesFirstGamesFilters } from '../models/fixtures-first-games-fitlers.model';
import { FixturesFirstGamesTeam } from '../models/fixtures-first-games-team.model';

@Injectable()
export class FixturesFirstGamesTeamsLoader {
  private filters: FixturesFirstGamesFilters;
  private nextMatchday: number;

  constructor() {}

  public load(teams: Team[], filters: FixturesFirstGamesFilters, nextMatchday: number): FixturesFirstGamesTeam[] {
    this.filters = filters;
    this.nextMatchday = nextMatchday;

    Logger.logDev(
      `fixtures first games teams loader, loading for:  matchdays count: ${this.filters.matchdays}, next matchday: ${this.nextMatchday}`
    );

    return new ArrayStream<Team>(teams).convertQuick((team) => this.toFixturesGamesTeam(team)).collect();
  }

  private toFixturesGamesTeam(team: Team): FixturesFirstGamesTeam {
    const firstGames = this.getFirstGames(team);
    return {
      teamShort: team.shortName,
      firstGamesCount: firstGames.length,
      mds: firstGames
    };
  }

  private getFirstGames(team: Team): number[] {
    return new ArrayStream<Fixture>(team.games)
      .filterQuick(
        (game) => game.matchday >= this.nextMatchday && game.matchday < this.nextMatchday + this.filters.matchdays
      )
      .filterQuick((g) => g.isMatchdayFirstGame)
      .collect()
      .map((game) => game.matchday);
  }
}
