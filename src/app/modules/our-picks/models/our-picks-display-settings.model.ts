import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { OurPicksDisplay } from './our-picks-display.enum';
import { OurPicksView } from './our-picks-view.enum';

export interface OurPicksDisplaySettings {
  display: OurPicksDisplay;
  view: OurPicksView;
  sortBy: SortByItem;
}
