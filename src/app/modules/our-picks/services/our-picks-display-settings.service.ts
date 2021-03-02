import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OurPicksDisplaySettings } from '../models/our-picks-display-settings.model';
import { OurPicksDisplay } from '../models/our-picks-display.enum';
import { OurPicksOrderBy } from '../models/our-picks-order-by.enum';
import { OurPicksView } from '../models/our-picks-view.enum';

@Injectable()
export class OurPicksDisplaySettingsService {
  private readonly STORAGE_KEY = 'OUR_PICKS_DISPLAY';

  private defaultValue: OurPicksDisplaySettings = {
    display: OurPicksDisplay.TILES,
    view: OurPicksView.EXTENDED,
    sortBy: { value: 'order', text: 'Our Order' }
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

  private send(): void {
    this.localStorage.upsert<OurPicksDisplaySettings>(this.STORAGE_KEY, this.settings);
    this.settings$.next({ ...this.settings });
  }

  private getInitialValue(): OurPicksDisplaySettings {
    const fromCache = this.localStorage.get<OurPicksDisplaySettings>(this.STORAGE_KEY);

    if (!fromCache) {
      return this.defaultValue;
    }

    if (!fromCache.view) {
      return { ...fromCache, view: this.defaultValue.view };
    }

    return fromCache;
  }
}
