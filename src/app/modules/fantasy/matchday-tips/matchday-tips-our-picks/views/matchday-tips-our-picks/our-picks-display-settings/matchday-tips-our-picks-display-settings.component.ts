import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { MatchdayTipsOurPicksDisplaySettings } from '../../../models/matchday-tips-our-picks-display-settings.model';
import { MatchdayTipsOurPicksDisplay } from '../../../models/matchday-tips-our-picks-display.enum';
import { MatchdayTipsOurPicksView } from '../../../models/matchday-tips-our-picks-view.enum';
import { MatchdayTipsOurPicksDisplaySettingsService } from '../../../services/matchday-tips-our-picks-display-settings.service';

@Component({
  selector: 'app-matchday-tips-our-picks-display-settings',
  templateUrl: './matchday-tips-our-picks-display-settings.component.html',
  styleUrls: ['./matchday-tips-our-picks-display-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksDisplaySettingsComponent implements OnInit {
  public settings$: Observable<MatchdayTipsOurPicksDisplaySettings>;
  public screenLarge$: Observable<boolean>;

  public displayItems: SwitchItem[] = [
    { value: MatchdayTipsOurPicksDisplay.LIST, matIcon: 'reorder' },
    { value: MatchdayTipsOurPicksDisplay.TILES, matIcon: 'grid_view' }
  ];

  public sortsSimplified: SortByItem[] = [
    { value: 'order', text: 'Relevance' },
    { value: 'price', text: 'Price' },
    { value: 'popularity', text: 'Popularity' }
  ];

  public sortsExtended: SortByItem[] = [
    { value: 'order', text: 'Relevance' },
    { value: 'price', text: 'Price' },
    { value: 'formPts', text: 'Form' },
    { value: 'popularity', text: 'Popularity' },
    { value: 'top100Popularity', text: 'Top 100 popularity' }
  ];

  public Views = MatchdayTipsOurPicksView;

  constructor(
    private service: MatchdayTipsOurPicksDisplaySettingsService,
    private screenSizeService: ScreenSizeService
  ) {}

  public ngOnInit(): void {
    this.settings$ = this.service.selectAll();
    this.screenLarge$ = this.screenSizeService.onResize().pipe(map((size) => size > ScreenSize.MD));
  }

  public onDisplayChange(newDisplay: MatchdayTipsOurPicksDisplay): void {
    this.service.updateDisplay(newDisplay);
  }

  public onViewChange(newView: MatchdayTipsOurPicksView): void {
    this.service.udpateView(newView);
  }

  public onSortChange(sortBy: SortBy): void {
    this.service.updateSort(sortBy);
  }
}
