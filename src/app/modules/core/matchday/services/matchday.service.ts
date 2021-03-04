import { Injectable } from '@angular/core';
import { MatchdayFirstGames } from 'src/app/modules/core/matchday/models/matchday-first-games.model';
import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable({ providedIn: 'root' })
export class MatchdayService {
  private readonly MATCHDAYS_COUNT = 34;
  private matchdays: { [matchday: number]: Matchday } = {};

  public getAll(teams: Team[]): Matchday[] {
    if (!teams || teams.length === 0 || teams[0].games?.length === 0) {
      return [];
    }

    const matchdaysDto: Matchday[] = [];
    const maxMatchday = new ArrayStream<Fixture>(teams[0].games).maxBy((g) => g.matchday);

    for (let matchdayNum = 1; matchdayNum <= maxMatchday; matchdayNum++) {
      matchdaysDto.push(this.getFor(matchdayNum, teams));
    }

    return matchdaysDto;
  }

  public getFor(matchdayNum: number, teams: Team[]): Matchday {
    if (!!this.matchdays[matchdayNum]) {
      return this.matchdays[matchdayNum];
    }

    const teamsIncluded: string[] = [];
    const matchday: Matchday = { wasPlayed: false, num: matchdayNum, fixtures: {} };

    teams.forEach((team: Team) => {
      if (!teamsIncluded.includes(team.shortName)) {
        const fixture: Fixture = team.games.find((g) => g.matchday === matchdayNum);

        if (!!fixture) {
          const dateInMilis = fixture.date;
          const matchdayFixture: MatchdayFixture = {
            awayLong: fixture.opponentLong,
            awayShort: fixture.opponent,
            date: fixture.date,
            homeLong: team.name,
            homeShort: team.shortName,
            matchday: matchdayNum,
            homeRank: team.rank,
            awayRank: fixture.opponentRank
          };

          if (!matchday.fixtures[dateInMilis.toString()]) {
            matchday.fixtures[dateInMilis.toString()] = [];
          }

          matchday.wasPlayed = fixture.wasPlayed;
          matchday.fixtures[dateInMilis.toString()].push(matchdayFixture);

          teamsIncluded.push(team.shortName);
          teamsIncluded.push(fixture.opponent);
        }
      }
    });

    this.matchdays[matchdayNum] = matchday;
    return matchday;
  }

  public getMatchdaysFirstGames(teams: Team[], fromMatchday: number, toMatchday?: number): MatchdayFirstGames[] {
    if (!teams || teams.length === 0) {
      return null;
    }

    const maxMatchday = !!toMatchday ? toMatchday : this.MATCHDAYS_COUNT + 1;
    const firstGames: MatchdayFirstGames[] = [];
    for (let matchdayNum = fromMatchday; matchdayNum < maxMatchday; matchdayNum++) {
      const matchday = this.getFor(matchdayNum, teams);
      const matchdayFistGames = this.createMatchdayFirstGames(matchday);

      if (!matchdayFistGames) {
        break;
      }

      firstGames.push(matchdayFistGames);
    }

    return firstGames;
  }

  private createMatchdayFirstGames(matchday: Matchday): MatchdayFirstGames {
    const firstGame = this.getMatchdayFirstFixture(matchday);

    if (!firstGame || new Date(firstGame.date).getFullYear() === 1) {
      return null;
    }

    return {
      wasPlayed: matchday.wasPlayed,
      matchday: matchday.num,
      date: firstGame.date,
      fixtures: matchday.fixtures[firstGame.date.toString()]
    };
  }

  private getMatchdayFirstFixture(matchday: Matchday): MatchdayFixture {
    const fixtures: MatchdayFixture[] = [];
    for (const key in matchday.fixtures) {
      if (Object.prototype.hasOwnProperty.call(matchday.fixtures, key)) {
        matchday.fixtures[key].forEach((game) => fixtures.push(game));
      }
    }

    return this.getMatchdaysFirstFixtureFrom(fixtures);
  }

  private getMatchdaysFirstFixtureFrom(fixtures: MatchdayFixture[]): MatchdayFixture {
    return new ArrayStream<MatchdayFixture>(fixtures).orderByDate('date', 'asc').takeFirst();
  }
}
