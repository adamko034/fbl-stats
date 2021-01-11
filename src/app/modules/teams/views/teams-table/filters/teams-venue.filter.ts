import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { TableTeam } from 'src/app/modules/teams/views/teams-table/models/table-team.model';
import { TableTeamService } from 'src/app/modules/teams/views/teams-table/services/table-team.service';

export class TeamsVenueFilter implements Filterable<TableTeam> {
  private tableTeamsService: TableTeamService;

  constructor(private venue: 'all' | 'h' | 'a') {
    this.tableTeamsService = new TableTeamService();
  }

  public filter(teams: TableTeam[]): TableTeam[] {
    if (!teams || teams.length === 0 || this.venue === 'all') {
      return teams;
    }

    const newTeams: TableTeam[] = [];
    teams.forEach((team) => {
      let games = team.games.filter((g) => g.wasPlayed);

      if (this.venue === 'h') {
        games = games.filter((g) => g.isHome);
      } else {
        games = games.filter((g) => !g.isHome);
      }

      newTeams.push(this.tableTeamsService.createFrom(games, team));
    });

    return this.tableTeamsService.setRank(newTeams);
  }
}
