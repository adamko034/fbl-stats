import { LeaderPlayer } from 'src/app/store/leaders/models/leader-player.model';
import { LeadersPlayersCombinationUsage } from 'src/app/store/leaders/models/leaders-players-combination-usage.model';

export interface LeadersPlayersByPosition {
  combinations: LeadersPlayersCombinationUsage[];
  players: LeaderPlayer[];
}
