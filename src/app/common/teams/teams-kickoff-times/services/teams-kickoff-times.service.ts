import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamService } from '../../../../modules/core/teams/services/team.service';

@Injectable()
export class TeamsKickoffTimesService {
  constructor(private teamService: TeamService) {}

  public getDifferentKickoffTimes(
    team: Team,
    other: Team,
    fromMatchday: number,
    untillMatchday: number = 0
  ): Fixture[] {
    untillMatchday = untillMatchday === 0 ? this.teamService.getFirstMatchdayWithMissingDate(team) : untillMatchday;

    return new ArrayStream<Fixture>(team.games)
      .filterQuick((g) => g.matchday >= fromMatchday && g.matchday <= untillMatchday)
      .filterQuick((g) => this.isDifferentKickOff(g, other))
      .collect();
  }

  private isDifferentKickOff(game: Fixture, otherTeam: Team) {
    const otherTeamGame = new ArrayStream<Fixture>(otherTeam.games)
      .filterQuick((g) => g.matchday === game.matchday)
      .takeFirst();

    return otherTeamGame.date !== game.date;
  }
}
