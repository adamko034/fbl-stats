import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { TeamsGamesLastnFilter } from 'src/app/modules/core/teams/filters/team-games-lastn.filter';
import { TeamsGamesPlayedFilter } from 'src/app/modules/core/teams/filters/team-games-played.filter';
import { TeamsGamesVenueFilter } from 'src/app/modules/core/teams/filters/team-games-venue.filter';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ResultIndicatorService } from 'src/app/services/result-indicator.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsGamesFilters } from '../models/teams-games-filters';

export class TeamsGamesFitlerAndCalculate implements Actionable<Team> {
  constructor(private resultIndicatorService: ResultIndicatorService, private filters: TeamsGamesFilters) {}

  public exec(items: Team[]): Team[] {
    return new ArrayStream<Team>(items).convertQuick((team) => this.createSingle(team)).collect();
  }

  private createSingle(team: Team): Team {
    const games = team.games;
    let stream = new ArrayStream<Fixture>(games).filter(new TeamsGamesPlayedFilter());

    if (this.filters.venue != 'all') {
      stream = stream.filter(new TeamsGamesVenueFilter(this.filters.venue === 'h' ? 'h' : 'a'));
    }

    if (this.filters.games > 1 && this.filters.games <= 5) {
      stream = stream.filter(new TeamsGamesLastnFilter(this.filters.games));
    }

    return this.createFrom(stream.collect(), team);
  }

  private createFrom(games: Fixture[], team: Team): Team {
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
      rank: team.rank,
      gcpg: Math.round((goalsConceded / games.length) * 10) / 10 || 0,
      gspg: Math.round((goalsScored / games.length) * 10) / 10 || 0,
      last2Games: team.last2Games,
      last3Games: team.last3Games,
      last4Games: team.last4Games,
      last5Games: team.last5Games
    };
  }
}
