import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

export interface PlayersCompareState {
  players: Player[];
  teams: { [short: string]: Team };
  lastMatchday: number;
}
