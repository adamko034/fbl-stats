import { LeadersPlayersCombinationUsage } from './leaders-players-combination-usage.model';

export interface LeadersPlayersCombination {
  goalkeepers: LeadersPlayersCombinationUsage[];
  defenders: LeadersPlayersCombinationUsage[];
  midfielders: LeadersPlayersCombinationUsage[];
  forwards: LeadersPlayersCombinationUsage[];
}
