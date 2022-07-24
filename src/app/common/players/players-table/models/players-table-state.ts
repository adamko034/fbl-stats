import { PlayersTableConfig } from './state/players-table-config.model';
import { PlayersTablePlayer } from './state/players-table-player.model';
import { PlayersTableTeam } from './state/players-table-team.model';

export interface PlayersTableState {
  players: PlayersTablePlayer[];
  config: PlayersTableConfig;
  lastMatchday: number;
  maxPrice: number;
  teams: PlayersTableTeam[];
  season?: string;
}
