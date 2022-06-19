import { Injectable } from '@angular/core';
import { BundesligaTableTeam } from 'src/app/common/teams/bundesliga-table/models/state/bundesliga-table-team';
import { BundesligaTableTeamGame } from 'src/app/common/teams/bundesliga-table/models/state/bundesliga-table-team-game.model';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { TeamsGamesPlayedFilter } from 'src/app/modules/core/teams/filters/team-games-played.filter';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable()
export class TeamsBundesligaTableTeamsConverter implements Convertable<Team, BundesligaTableTeam> {
  public convert(items: Team[]): BundesligaTableTeam[] {
    return items.map((team) => this.convertSingle(team));
  }

  private convertSingle(team: Team): BundesligaTableTeam {
    const { name, shortName, rank, previousRank } = team;
    const games = new ArrayStream(team.games)
      .filter(new TeamsGamesPlayedFilter())
      .convertQuick((g) => this.convertGame(g))
      .collect();

    return { name, shortName, rank, previousRank, games };
  }

  private convertGame(game: Fixture): BundesligaTableTeamGame {
    return {
      goalsConceded: game.goalsConceded,
      goalsScored: game.goalsScored,
      isHome: game.isHome,
      matchday: game.matchday,
      points: game.points
    };
  }
}
