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

  public getTeamHomeMatchdays(team: Team): number[] {
    return this.getMatchdaysByVenue(team, true);
  }

  public getTeamAwayMatchdays(team: Team): number[] {
    return this.getMatchdaysByVenue(team, false);
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

  private getMatchdaysByVenue(team: Team, isHome: boolean): number[] {
    return this.getPlayedGames(team)
      .filter((g) => g.isHome === isHome)
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
}
