import { HistoryBundesligaTeam } from './history-bundesliga-team.model';
import { HistoryPlayer } from './history-player.model';

export interface History {
  season: string;
  players?: HistoryPlayer[];
  bundesligaTeams?: HistoryBundesligaTeam[];
}
