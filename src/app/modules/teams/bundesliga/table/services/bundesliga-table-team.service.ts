import { Injectable } from '@angular/core';
import { OrderByPipe } from 'ngx-pipes';
import { ResultIndicatorService } from 'src/app/services/result-indicator.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable()
export class BundesligaTableTeamService {
  constructor(private resultIndicatorService: ResultIndicatorService) {}

  public createFrom(games: Fixture[], team: Team): Team {
    let goalsConceded = 0;
    let goalsScored = 0;
    const draws = games.filter((g) => g.result === 0).length;
    const wins = games.filter((g) => g.result === 1).length;

    games.map((g) => g.resultText.split(':')[1]).forEach((g) => (goalsConceded += +g));
    games.map((g) => g.resultText.split(':')[0]).forEach((g) => (goalsScored += +g));

    return {
      name: team.name,
      shortName: team.shortName,
      gamesPlayed: games.length,
      draws,
      wins,
      losses: games.filter((g) => g.result === -1).length,
      points: wins * 3 + draws,
      goalsConceded,
      goalsScored,
      form: this.resultIndicatorService.fromResultArray(games.map((g) => g.result)),
      games,
      rank: 0,
      gcpg: Math.round((goalsConceded / games.length) * 10) / 10 || 0,
      gspg: Math.round((goalsScored / games.length) * 10) / 10 || 0,
      last2Games: team.last2Games,
      last3Games: team.last3Games,
      last4Games: team.last4Games,
      last5Games: team.last5Games
    };
  }

  public setRank(teams: Team[], by = '-points'): Team[] {
    const ordered = new OrderByPipe().transform(teams, by);
    let rank = 1;
    ordered.forEach((o) => (o.rank = rank++));

    return ordered;
  }
}
