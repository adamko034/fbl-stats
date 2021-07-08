import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { GuiConfigOurPicks } from 'src/app/store/gui-config/gui-config.model';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';
import { OurPicksDisplaySettings } from '../models/our-picks-display-settings.model';
import { OurPicksDisplay } from '../models/our-picks-display.enum';
import { OurPicksView } from '../models/our-picks-view.enum';

@Injectable()
export class OurPicksDisplaySettingsService {
  private defaultValue: OurPicksDisplaySettings = {
    display: OurPicksDisplay.TILES,
    view: OurPicksView.SIMPLIFIED,
    sortBy: { value: 'order', sortByItem: { text: 'Relevance', value: 'order' }, direction: 'asc' }
  };

  private settings: OurPicksDisplaySettings = this.defaultValue;
  private settings$ = new ReplaySubject<OurPicksDisplaySettings>(1);

  constructor(private guiConfigStore: GuiConfigStore) {
    this.guiConfigStore.selectOurPicksDisplaySettings().subscribe((guiConfigSettings: GuiConfigOurPicks) => {
      if (!!guiConfigSettings) {
        const { view, display, sortBy } = guiConfigSettings;
        this.settings = { ...this.settings, view, display, sortBy };
        this.send();
      }
    });
  }

  public selectAll(): Observable<OurPicksDisplaySettings> {
    return this.settings$.asObservable();
  }

  public updateDisplay(display: OurPicksDisplay): void {
    this.settings.display = display;
    this.rememberInLocalStorage();
    this.send();
  }

  public udpateView(view: OurPicksView): void {
    this.settings.view = view;
    this.rememberInLocalStorage();
    this.send();
  }

  public updateSort(sortBy: SortBy): void {
    this.settings.sortBy = sortBy;
    this.rememberInLocalStorage();
    this.send();
  }

  private send(): void {
    this.settings$.next({ ...this.settings });
  }

  private rememberInLocalStorage(): void {
    const { display, view, sortBy } = this.settings;
    this.guiConfigStore.changeOurPicksDisplaySettings({ display, view, sortBy });
  }
}
