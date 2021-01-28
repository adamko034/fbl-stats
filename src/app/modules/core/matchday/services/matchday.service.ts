import { Injectable } from '@angular/core';
import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable({ providedIn: 'root' })
export class MatchdayService {
  public createFor(matchdayNum: number, teams: Team[]): Matchday {
    const teamsIncluded: string[] = [];
    const matchday: Matchday = { num: matchdayNum, fixtures: {} };

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
            homeShort: team.shortName
          };

          if (!matchday.fixtures[dateInMilis.toString()]) {
            matchday.fixtures[dateInMilis.toString()] = [];
          }

          matchday.fixtures[dateInMilis.toString()].push(matchdayFixture);

          teamsIncluded.push(team.shortName);
          teamsIncluded.push(fixture.opponent);
        }
      }
    });

    return matchday;
  }
}
