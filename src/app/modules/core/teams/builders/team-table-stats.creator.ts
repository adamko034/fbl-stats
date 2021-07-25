import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamTableStats } from '../models/team-table-stats.model';

@Injectable({ providedIn: 'root' })
export class TeamTableStatsCreator {
  public from(team: Team, includeNGames?: number): TeamTableStats {
    if (!includeNGames || includeNGames === 0) {
      return {
        draws: team.draws,
        games: team.gamesPlayed,
        gcpg: team.gcpg,
        goalsConceded: team.goalsConceded,
        goalsScored: team.goalsScored,
        gspg: team.gspg,
        losses: team.losses,
        points: team.points,
        rank: team.rank,
        wins: team.wins
      };
    }

    const games = new ArrayStream<Fixture>(team.games)
      .filterQuick((x) => x.wasPlayed)
      .orderBy('matchday', 'dsc')
      .take(5)
      .collect();
    return this.fromGames(games);
  }

  public fromGames(games: Fixture[]): TeamTableStats {
    const wins = games.filter((x) => x.result === 1).length;
    const draws = games.filter((x) => x.result === 0).length;
    const losses = games.filter((x) => x.result === -1).length;
    const scored = this.sum(games, 'goalsScored');
    const conceded = this.sum(games, 'goalsConceded');
    const gamesPlayed = games.length;

    return {
      draws,
      wins,
      games: gamesPlayed,
      gcpg: Math.round((conceded / gamesPlayed) * 10) / 10 || 0,
      gspg: Math.round((scored / gamesPlayed) * 10) / 10 || 0,
      goalsConceded: conceded,
      goalsScored: scored,
      losses,
      points: wins * 3 + draws
    };
  }

  private sum(games: Fixture[], field: string): number {
    return games.map((x) => x[field] || 0).reduce((a, b) => a + b, 0);
  }
}
