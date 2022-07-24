import { HistoryTeam } from 'src/app/store/history/models/history-team.model';

export interface HistoryBundesligaState {
  season: string;
  teams: HistoryTeam[];
}
