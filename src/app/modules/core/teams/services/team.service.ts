import { Injectable } from '@angular/core';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable()
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
