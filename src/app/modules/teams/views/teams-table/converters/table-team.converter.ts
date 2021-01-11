import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { TableTeam } from 'src/app/modules/teams/views/teams-table/models/table-team.model';
import { Team } from 'src/app/store/teams/models/team.model';

export class TableTeamConverter implements Convertable<Team, TableTeam> {
  public convert(teams: Team[]): TableTeam[] {
    return teams.map((t) => ({
      ...t,
      gspg: Math.round((t.goalsScored / t.gamesPlayed) * 10) / 10,
      gcpg: Math.round((t.goalsConceded / t.gamesPlayed) * 10) / 10
    }));
  }
}
