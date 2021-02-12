import { LeaderPlayer } from './leader-player.model';
import { LeadersPlayersCombinations } from './leaders-players-combinations.model';

export interface LeadersPlayers {
  combinations: LeadersPlayersCombinations;
  popularPicks: LeaderPlayer[];
  all: LeaderPlayer[];
}
