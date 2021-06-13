import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { OurPicksDisplaySettings } from '../models/our-picks-display-settings.model';
import { OurPicksDisplay } from '../models/our-picks-display.enum';
import { OurPicksView } from '../models/our-picks-view.enum';

@Injectable()
export class OurPicksDisplaySettingsService {
  private readonly STORAGE_KEY = 'OUR_PICKS_DISPLAY';

  private defaultValue: OurPicksDisplaySettings = {
    display: OurPicksDisplay.TILES,
    view: OurPicksView.SIMPLIFIED,
    sortBy: { value: 'order', sortByItem: { text: 'Relevance', value: 'order' }, direction: 'asc' }
  };

  private settings: OurPicksDisplaySettings = this.getInitialValue();
  private settings$ = new ReplaySubject<OurPicksDisplaySettings>(1);

  constructor(private localStorage: LocalStorageService) {
    this.send();
  }

  public selectAll(): Observable<OurPicksDisplaySettings> {
    return this.settings$.asObservable();
  }

  public updateDisplay(display: OurPicksDisplay): void {
    this.settings.display = display;
    this.send();
  }

  public udpateView(view: OurPicksView): void {
    this.settings.view = view;
    this.send();
  }

  public updateSort(sortBy: SortBy): void {
    this.settings.sortBy = sortBy;
    this.send();
  }

  private send(): void {
    this.localStorage.upsert(this.STORAGE_KEY, { display: this.settings.display, view: this.settings.view });
    this.settings$.next({ ...this.settings });
  }

  private getInitialValue(): OurPicksDisplaySettings {
    let fromCache = this.localStorage.get<{ display: OurPicksDisplay; view: OurPicksView }>(this.STORAGE_KEY);

    if (!fromCache) {
      return this.defaultValue;
    }

    if (!fromCache.view) {
      fromCache = { ...fromCache, view: this.defaultValue.view };
    }

    return { ...fromCache, sortBy: this.defaultValue.sortBy };
  }
}
