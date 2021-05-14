import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { BundesligaTableTeam } from '../models/bundesliga-table-team.model';
import { BundesligaTableTeamService } from '../services/bundesliga-table-team.service';

export class BundesligaTeamsVenueFilter implements Filterable<BundesligaTableTeam> {
  constructor(private venue: 'all' | 'h' | 'a', private tableTeamsService: BundesligaTableTeamService) {}

  public filter(teams: BundesligaTableTeam[]): BundesligaTableTeam[] {
    if (!teams || teams.length === 0 || this.venue === 'all') {
      return teams;
    }

    const newTeams: BundesligaTableTeam[] = [];
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
