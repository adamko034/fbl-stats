import { FantasyTipLink } from './fantasy-tip-link.model';

export interface FantasyTips {
  matchday: number;
  links: FantasyTipLink[];
  categories?: string[];
}
