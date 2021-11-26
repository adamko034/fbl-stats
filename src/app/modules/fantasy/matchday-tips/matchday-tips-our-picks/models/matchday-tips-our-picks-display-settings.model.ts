import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { MatchdayTipsOurPicksDisplay } from './matchday-tips-our-picks-display.enum';
import { MatchdayTipsOurPicksView } from './matchday-tips-our-picks-view.enum';

export interface MatchdayTipsOurPicksDisplaySettings {
  display: MatchdayTipsOurPicksDisplay;
  view: MatchdayTipsOurPicksView;
  sortBy: SortBy;
}
