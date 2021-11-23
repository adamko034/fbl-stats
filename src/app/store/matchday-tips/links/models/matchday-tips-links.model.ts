import { MatchdayTipsLink } from './matchday-tips-link.model';

export interface MatchdaysTipsLinks {
  matchday: number;
  links: MatchdayTipsLink[];
  categories?: string[];
}
