import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { FixturesFirstGamesFilters } from '../models/fixtures-first-games-fitlers.model';
import { FixturesFirstGamesMatchday } from '../models/fixtures-first-games-matchday.model';

@Injectable()
export class FixturesFirstGamesMatchdaysLoader {
  private filters: FixturesFirstGamesFilters;
  private nextMatchday: number;

  public load(
    fixtures: MatchdayFixtures[],
    filters: FixturesFirstGamesFilters,
    nextMatchday: number
  ): FixturesFirstGamesMatchday[] {
    this.nextMatchday = nextMatchday;
    this.filters = filters;

    return new ArrayStream<MatchdayFixtures>(fixtures)
      .filterQuick(
        (f) => this.filters.matchdays.from <= f.matchdayNumber && f.matchdayNumber <= this.filters.matchdays.to
      )
      .convertQuick((f) => this.toFixturesFirstGamesMatchday(f))
      .collect();
  }

  private toFixturesFirstGamesMatchday(fixtures: MatchdayFixtures): FixturesFirstGamesMatchday {
    const fixturesFirstGames = fixtures.gamesPerDate[fixtures.firstGameDate];

    return {
      matchday: fixtures.matchdayNumber,
      date: fixtures.firstGameDate,
      games: fixturesFirstGames.map((g) => ({ teamHomeShort: g.homeTeamShort, teamAwayShort: g.awayTeamShort }))
    };
  }
}
