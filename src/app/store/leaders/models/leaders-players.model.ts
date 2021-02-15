import { LeaderPlayer } from './leader-player.model';
import { LeadersPlayersCombinations } from './leaders-players-combinations.model';
import { LeadersStars } from './leaders-stars.model';

export interface LeadersPlayers {
  combinations: LeadersPlayersCombinations;
  all: LeaderPlayer[];
  stars: LeadersStars;
}
