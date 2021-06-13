import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { OurPicksDisplaySettings } from '../../models/our-picks-display-settings.model';
import { OurPicksDisplay } from '../../models/our-picks-display.enum';
import { OurPicksView } from '../../models/our-picks-view.enum';
import { OurPicksDisplaySettingsService } from '../../services/our-picks-display-settings.service';

@Component({
  selector: 'app-our-picks-display-settings',
  templateUrl: './our-picks-display-settings.component.html',
  styleUrls: ['./our-picks-display-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksDisplaySettingsComponent implements OnInit {
  public settings$: Observable<OurPicksDisplaySettings>;
  public screenLarge$: Observable<boolean>;

  public displayItems: SwitchItem[] = [
    { value: OurPicksDisplay.LIST, matIcon: 'reorder' },
    { value: OurPicksDisplay.TILES, matIcon: 'grid_view' }
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

  public Views = OurPicksView;

  constructor(private service: OurPicksDisplaySettingsService, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.settings$ = this.service.selectAll();
    this.screenLarge$ = this.screenSizeService.onResize().pipe(map((size) => size > ScreenSize.MD));
  }

  public onDisplayChange(newDisplay: OurPicksDisplay): void {
    this.service.updateDisplay(newDisplay);
  }

  public onViewChange(newView: OurPicksView): void {
    this.service.udpateView(newView);
  }

  public onSortChange(sortBy: SortBy): void {
    this.service.updateSort(sortBy);
  }
}
