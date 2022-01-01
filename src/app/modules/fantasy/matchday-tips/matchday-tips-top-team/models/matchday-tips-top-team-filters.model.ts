import { MatchdayTipsTopTeamType } from './matchday-tips-top-team-type.enum';

export interface MatchdayTipsTopTeamFilters {
  price: number;
  popularity: number;
  top500Popularity: number;
  calculation: MatchdayTipsTopTeamType;
}
