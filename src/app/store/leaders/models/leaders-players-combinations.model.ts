import { LeadersPlayersCombination as LeadersPlayersCombination } from './leaders-players-combination.model';

export interface LeadersPlayersCombinations {
  goalkeepers: LeadersPlayersCombination[];
  defenders: LeadersPlayersCombination[];
  midfielders: LeadersPlayersCombination[];
  forwards: LeadersPlayersCombination[];
}
