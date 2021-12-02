import { MatchdayTipsLink } from 'src/app/store/matchday-tips/links/models/matchday-tips-link.model';

export interface AdminMatchdayTipsLink extends MatchdayTipsLink {
  isAdminNew: boolean;
}
