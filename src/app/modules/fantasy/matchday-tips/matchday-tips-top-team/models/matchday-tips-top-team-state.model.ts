import { MatchdayTipsTopTeamFilters } from './matchday-tips-top-team-filters.model';
import { MatchdayTipsTopTeam } from './matchday-tips-top-team.model';

export interface MatchdayTipsTopTeamState {
  maxPrice: number;
  lastMatchday: number;
  filters: MatchdayTipsTopTeamFilters;
  team: MatchdayTipsTopTeam;
}
