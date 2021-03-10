import { LeaderPlayer } from 'src/app/store/leaders/models/leader-player.model';
import { LeadersPlayersCombination } from 'src/app/store/leaders/models/leaders-players-combination.model';
import { LeadersStar } from 'src/app/store/leaders/models/leaders-star.model';

export interface LeadersPlayersByPosition {
  combinations: LeadersPlayersCombination[];
  players: LeaderPlayer[];
  stars: LeadersStar[];
}
