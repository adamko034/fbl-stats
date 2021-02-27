import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OurPicksDisplaySettings } from '../models/our-picks-display-settings.model';
import { OurPicksDisplay } from '../models/our-picks-display.enum';

@Injectable()
export class OurPicksDisplaySettingsService {
  private readonly STORAGE_KEY = 'OUR_PICKS_DISPLAY';

  private settings: OurPicksDisplaySettings = this.getInitialValue();
  private settings$ = new ReplaySubject<OurPicksDisplaySettings>(1);

  constructor(private localStorage: LocalStorageService) {
    this.send();
  }

  public selectAll(): Observable<OurPicksDisplaySettings> {
    return this.settings$.asObservable();
  }

  public updateDisplay(display: OurPicksDisplay) {
    this.settings.display = display;
    this.send();
  }

  private send(): void {
    this.localStorage.upsert<OurPicksDisplaySettings>(this.STORAGE_KEY, this.settings);
    this.settings$.next({ ...this.settings });
  }

  private getInitialValue(): OurPicksDisplaySettings {
    return this.localStorage.get<OurPicksDisplaySettings>(this.STORAGE_KEY) || { display: OurPicksDisplay.TILES };
  }
}
