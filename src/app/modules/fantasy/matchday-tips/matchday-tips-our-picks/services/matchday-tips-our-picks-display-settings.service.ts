import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { GuiConfigOurPicks } from 'src/app/store/gui-config/gui-config.model';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';
import { MatchdayTipsOurPicksDisplaySettings } from '../models/matchday-tips-our-picks-display-settings.model';
import { MatchdayTipsOurPicksDisplay } from '../models/matchday-tips-our-picks-display.enum';
import { MatchdayTipsOurPicksView } from '../models/matchday-tips-our-picks-view.enum';

@Injectable()
export class MatchdayTipsOurPicksDisplaySettingsService {
  private defaultValue: MatchdayTipsOurPicksDisplaySettings = {
    display: MatchdayTipsOurPicksDisplay.TILES,
    view: MatchdayTipsOurPicksView.SIMPLIFIED,
    sortBy: { value: 'order', sortByItem: { text: 'Relevance', value: 'order' }, direction: 'asc' }
  };

  private settings: MatchdayTipsOurPicksDisplaySettings = this.defaultValue;
  private settings$ = new ReplaySubject<MatchdayTipsOurPicksDisplaySettings>(1);

  constructor(private guiConfigStore: GuiConfigStore) {
    this.send();
    this.guiConfigStore.selectOurPicksDisplaySettings().subscribe((guiConfigSettings: GuiConfigOurPicks) => {
      if (!!guiConfigSettings) {
        const { view, display, sortBy } = guiConfigSettings;
        this.settings = { ...this.settings, view, display, sortBy };
        this.send();
      }
    });
  }

  public selectAll(): Observable<MatchdayTipsOurPicksDisplaySettings> {
    return this.settings$.asObservable();
  }

  public updateDisplay(display: MatchdayTipsOurPicksDisplay): void {
    this.settings.display = display;
    this.rememberInLocalStorage();
    this.send();
  }

  public udpateView(view: MatchdayTipsOurPicksView): void {
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
