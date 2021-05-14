import { OrderByPipe } from 'ngx-pipes';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { BundesligaTableTeam } from '../models/bundesliga-table-team.model';
import { BundesligaTableTeamService } from '../services/bundesliga-table-team.service';

export class BundesligaTeamsGamesFilter implements Filterable<BundesligaTableTeam> {
  constructor(private games: number, private bundesligaTeamService: BundesligaTableTeamService) {}

  public filter(items: BundesligaTableTeam[]): BundesligaTableTeam[] {
    if (!items || items.length === 0 || this.games === 0) {
      return items;
    }

    const newTeams: BundesligaTableTeam[] = [];

    items.forEach((team) => {
      let games = team.games.filter((g) => g.wasPlayed);
      games = new OrderByPipe().transform(games, '-matchday').slice(0, this.games);

      newTeams.push(this.bundesligaTeamService.createFrom(games, team));
    });

    return this.bundesligaTeamService.setRank(newTeams);
  }
}
