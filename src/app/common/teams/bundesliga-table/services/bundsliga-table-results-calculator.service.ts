import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Venue } from 'src/app/shared/models/venue.enum';
import { BundesligaTableFilters } from '../models/internal/bundesliga-table-filters';
import { BundesligaTableTeamResult } from '../models/internal/bundesliga-table-team-result';
import { BundesligaTableTeam } from '../models/state/bundesliga-table-team';
import { BundesligaTableTeamGame } from '../models/state/bundesliga-table-team-game.model';

@Injectable()
export class BundesligaTableResultsCalculator {
  public calculate(
    teams: BundesligaTableTeam[],
    filters: BundesligaTableFilters,
    lastMatchday: number
  ): BundesligaTableTeamResult[] {
    const results: BundesligaTableTeamResult[] = [];
    teams.forEach((team) => {
      const result = this.calculateSingle(team, filters, lastMatchday);
      results.push(result);
    });

    return new ArrayStream<BundesligaTableTeamResult>(results)
      .orderByThenBy({ field: 'points', order: 'dsc' }, { field: 'rank', order: 'asc' })
      .collect();
  }

  private calculateSingle(
    team: BundesligaTableTeam,
    filters: BundesligaTableFilters,
    lastMatchday: number
  ): BundesligaTableTeamResult {
    const filteredGames: BundesligaTableTeamGame[] = this.filterGames(team.games, filters, lastMatchday);

    const gamesPlayed = filteredGames.length;
    const cleanSheets = filteredGames.filter((g) => g.goalsConceded === 0).length;
    const failedToScore = filteredGames.filter((g) => g.goalsScored === 0).length;
    const goalsScored = new ArrayStream(filteredGames, false).sumBy((g) => g.goalsScored);
    const goalsConceded = new ArrayStream(filteredGames, false).sumBy((g) => g.goalsConceded);

    const points = new ArrayStream(filteredGames).sumBy((g) => g.points);

    return {
      name: team.name,
      shortName: team.shortName,
      rank: team.rank,
      previousRank: team.previousRank,
      points,
      gamesPlayed,
      cleanSheets,
      cleanSheetsPercentage: MathHelper.divideAndRoundPercentage(cleanSheets, gamesPlayed),
      failedToScore,
      failedToScorePercentage: MathHelper.divideAndRoundPercentage(failedToScore, gamesPlayed),
      draws: filteredGames.filter((g) => g.points === 1).length,
      goalsScored,
      gspg: MathHelper.divideAndRound(goalsScored, gamesPlayed),
      goalsConceded,
      gcpg: MathHelper.divideAndRound(goalsConceded, gamesPlayed),
      goalsDiff: goalsScored - goalsConceded,
      losses: filteredGames.filter((g) => g.points === 0).length,
      wins: filteredGames.filter((g) => g.points === 3).length,
      form: this.extractForm(filteredGames)
    };
  }

  private filterGames(
    games: BundesligaTableTeamGame[],
    filters: BundesligaTableFilters,
    lastMatchday: number
  ): BundesligaTableTeamGame[] {
    let stream = new ArrayStream(games);

    if (filters.venue != Venue.ALL) {
      stream =
        filters.venue === Venue.HOME ? stream.filterQuick((g) => g.isHome) : stream.filterQuick((g) => !g.isHome);
    }

    return stream.orderByDate('matchday', 'desc').take(filters.matchdays).collect();
  }

  private extractForm(filteredGames: BundesligaTableTeamGame[]): string {
    return new ArrayStream(filteredGames, false)
      .orderBy('matchday', 'dsc')
      .take(6)
      .convertQuick<string>((g) => this.mapPointsToResultChar(g.points))
      .join('');
  }

  private mapPointsToResultChar(points: number): string {
    if (points === 0) {
      return 'L';
    }

    return points === 1 ? 'D' : 'W';
  }
}
