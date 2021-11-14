import { Injectable } from '@angular/core';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsBundesligaTableTeam } from '../models/teams-bundesliga-table-team.model';

@Injectable()
export class TeamsBundesligaTableTeamsConverter implements Convertable<Team, TeamsBundesligaTableTeam> {
  public convert(items: Team[]): TeamsBundesligaTableTeam[] {
    return items.map((team) => this.convertSingle(team));
  }

  private convertSingle(team: Team): TeamsBundesligaTableTeam {
    const {
      points,
      wins,
      draws,
      losses,
      goalsScored,
      goalsConceded,
      form,
      gamesPlayed,
      gspg,
      gcpg,
      shortName,
      name,
      rank,
      previousRank
    } = team;
    const cleanSheets = new ArrayStream<Fixture>(team.games).countBy((g) => g.goalsConceded === 0);
    const failedToScore = new ArrayStream<Fixture>(team.games).countBy((g) => g.goalsScored === 0);

    return {
      shortName,
      name,
      points,
      wins,
      draws,
      losses,
      goalsScored,
      goalsConceded,
      goalsDiff: goalsScored - goalsConceded,
      form,
      gamesPlayed,
      gspg,
      gcpg,
      rank,
      previousRank,
      rankFiltered: rank,
      cleanSheets,
      cleanSheetsPercentage: MathHelper.divideAndRoundPercentage(cleanSheets, gamesPlayed),
      failedToScore,
      failedToScorePercentage: MathHelper.divideAndRoundPercentage(failedToScore, gamesPlayed)
    };
  }
}
