import { PlayersFilter } from 'src/app/modules/core/players/filter/filters/players-filter';
import { SelectableTeam } from 'src/app/modules/fantasy/players/overall/models/selectable-team.model';
import { Player } from 'src/app/store/players/models/player.model';

export class PlayersFilterTeams implements PlayersFilter {
  constructor(private teams: SelectableTeam[]) {}

  public filter(players: Player[]): Player[] {
    if (!this.teams || this.teams.length === 0) {
      return players;
    }

    return players.filter((p) => this.teams.some((t) => t.short.toLowerCase() === p.teamShort.toLowerCase()));
  }
}
