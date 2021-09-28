import { Injectable } from '@angular/core';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable()
export class TeamService {
  public getTeamWinningMatchdays(team: Team): number[] {
    return this.getMatchdays(team, 1);
  }

  public getTeamDrawMatchdays(team: Team): number[] {
    return this.getMatchdays(team, 0);
  }

  public getTeamLostMatchdays(team: Team): number[] {
    return this.getMatchdays(team, -1);
  }

  private getMatchdays(team: Team, result: number): number[] {
    return team.games.filter((g) => g.wasPlayed && g.result !== null && g.result === result).map((g) => g.matchday);
  }
}
