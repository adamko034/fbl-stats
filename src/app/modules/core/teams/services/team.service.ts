import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  public getTeamWinningMatchdays(team: Team): number[] {
    return this.getMatchdaysByResult(team, 1);
  }

  public getTeamDrawMatchdays(team: Team): number[] {
    return this.getMatchdaysByResult(team, 0);
  }

  public getTeamLostMatchdays(team: Team): number[] {
    return this.getMatchdaysByResult(team, -1);
  }

  public getPlayedMatchdaysByVenue(team: Team, venue: 'all' | 'h' | 'a'): number[] {
    return this.getPlayedGamesByVenue(team, venue).map((g) => g.matchday);
  }

  public getPlayedGamesByVenue(team: Team, venue: 'all' | 'h' | 'a'): Fixture[] {
    const played = this.getPlayedGames(team);
    return this.filterByVenue(played, venue);
  }

  public getPlayedWonMatchdaysByVenue(team: Team, venue: 'all' | 'h' | 'a'): number[] {
    const gamesByVenue = this.getPlayedGamesByVenue(team, venue);
    return this.filterByResult(gamesByVenue, 1).map((g) => g.matchday);
  }

  public getPlayedMatchdaysVsBottom(team: Team, bottomN: number = 6): number[] {
    return this.getPlayedGames(team)
      .filter((g) => g.opponentRank > 18 - bottomN)
      .map((g) => g.matchday);
  }

  public getPlayedMatchdyasVsTop(team: Team, topN: number = 6): number[] {
    return this.getPlayedGames(team)
      .filter((g) => g.opponentRank <= topN)
      .map((g) => g.matchday);
  }

  public getFirstMatchdayWithMissingDate(team: Team): number {
    const missingDates = new ArrayStream<Fixture>(team.games)
      .orderBy('matchday', 'asc')
      .filterQuick((g) => g.date === 0)
      .collect();

    return missingDates.length === 0 ? 35 : missingDates[0].matchday;
  }

  public getFirstGames(team: Team, fromMatchday?: number, takeNextN?: number): Fixture[] {
    const stream = new ArrayStream<Fixture>(team.games)
      .filterQuick((g) => fromMatchday == null || g.matchday >= fromMatchday)
      .filterQuick((g) => g.matchday < 34)
      .filterQuick((g) => g.date != 0)
      .filterQuick((g) => g.isMatchdayFirstGame);

    if (takeNextN != null) {
      return stream.orderBy('matchday', 'asc').take(takeNextN).collect();
    }

    return stream.collect();
  }

  public getStandaloneGames(team: Team, fromMatchday?: number, takeNextN?: number): Fixture[] {
    let stream = new ArrayStream<Fixture>(team.games)
      .filterQuick((g) => fromMatchday == null || g.matchday >= fromMatchday)
      .filterQuick((g) => g.matchday < 34)
      .filterQuick((g) => g.date != 0);

    if (takeNextN != null) {
      stream = stream.orderBy('matchday', 'asc').take(takeNextN);
    }

    return stream.filterQuick((g) => g.isStandaloneFixture).collect();
  }

  public getGamesByVenue(team: Team, venue: 'h' | 'a', fromMatchday?: number, takeNextN?: number): Fixture[] {
    let stream = new ArrayStream<Fixture>(team.games).filterQuick(
      (g) => fromMatchday == null || g.matchday >= fromMatchday
    );

    if (takeNextN != null) {
      stream = stream.orderBy('matchday', 'asc').take(takeNextN);
    }

    return stream.filterQuick((g) => (venue === 'h' ? g.isHome : !g.isHome)).collect();
  }

  public getGamesByOpponentRank(
    team: Team,
    rank: 'top6' | 'bottom6',
    fromMatchday?: number,
    takeNextN?: number
  ): Fixture[] {
    let stream = new ArrayStream<Fixture>(team.games).filterQuick(
      (g) => fromMatchday === null || g.matchday >= fromMatchday
    );

    if (takeNextN != null) {
      stream = stream.orderBy('matchday', 'asc').take(takeNextN);
    }

    return stream
      .filterQuick((g) => {
        if (rank === 'top6') {
          return g.opponentRank <= 6;
        }

        return g.opponentRank >= 13;
      })
      .collect();

    return stream.collect();
  }

  private getMatchdaysByResult(team: Team, result: number): number[] {
    return this.getPlayedGames(team)
      .filter((g) => g.result === result)
      .map((g) => g.matchday);
  }

  private getPlayedGames(team: Team): Fixture[] {
    return team.games.filter((g) => g.wasPlayed && g.result !== null);
  }

  private filterByVenue(games: Fixture[], venue: 'all' | 'h' | 'a'): Fixture[] {
    if (venue === 'all') {
      return games;
    }

    return venue === 'h' ? games.filter((g) => g.isHome) : games.filter((g) => !g.isHome);
  }

  private filterByResult(games: Fixture[], result: number): Fixture[] {
    return games.filter((g) => g.result !== null && g.result === result);
  }
}
