import { HistoryPlayer } from './history-player.model';
import { HistoryTeam } from './history-team.model';

export interface History {
  season: string;
  players: HistoryPlayer[];
  teams: HistoryTeam[];
}
