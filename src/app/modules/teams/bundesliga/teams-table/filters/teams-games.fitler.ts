import { OrderByPipe } from 'ngx-pipes';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { TableTeam } from 'src/app/modules/teams/bundesliga/teams-table/models/table-team.model';
import { TableTeamService } from 'src/app/modules/teams/bundesliga/teams-table/services/table-team.service';

export class TeamsGamesFilter implements Filterable<TableTeam> {
  private tableTeamService: TableTeamService;

  constructor(private games: number) {
    this.tableTeamService = new TableTeamService();
  }

  public filter(items: TableTeam[]): TableTeam[] {
    if (!items || items.length === 0 || this.games === 0) {
      return items;
    }

    const newTeams: TableTeam[] = [];

    items.forEach((team) => {
      let games = team.games.filter((g) => g.wasPlayed);
      games = new OrderByPipe().transform(games, '-matchday').slice(0, this.games);

      newTeams.push(this.tableTeamService.createFrom(games, team));
    });

    return this.tableTeamService.setRank(newTeams);
  }
}
