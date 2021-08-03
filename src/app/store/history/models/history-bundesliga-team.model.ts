import { HistoryBundesligaStats } from './history-bundesliga-stats.model';

export interface HistoryBundesligaTeam {
  teamShort: string;
  teamLong: string;

  overall: HistoryBundesligaStats;
  home: HistoryBundesligaStats;
  away: HistoryBundesligaStats;
  firstLeg: HistoryBundesligaStats;
  secondLeg: HistoryBundesligaStats;
}
