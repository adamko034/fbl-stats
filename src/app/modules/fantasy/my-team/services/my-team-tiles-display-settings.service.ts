import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { GuiConfigMyTeamDisplay } from 'src/app/store/gui-config/gui-config.model';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';
import { MyTeamTilesDisplaySettings } from '../models/my-team-tiles-display-settings.model';

@Injectable()
export class MyTeamTilesDisplaySettingsService {
  private settings: MyTeamTilesDisplaySettings = { displayed: true, tileOrder: '-price' };
  private settings$ = new ReplaySubject<MyTeamTilesDisplaySettings>(1);

  constructor(private guiConfigStore: GuiConfigStore) {
    this.send();

    this.guiConfigStore.selectMyTeamDisplay().subscribe((config) => {
      if (!!config) {
        this.settings.displayed = config.showTiles;
        this.settings.tileOrder = config.tileOrder;

        this.send();
      }
    });
  }

  public select(): Observable<MyTeamTilesDisplaySettings> {
    return this.settings$.pipe(distinctUntilChanged());
  }

  public selectTileOrder(): Observable<string> {
    return this.select().pipe(
      map((s) => s.tileOrder),
      distinctUntilChanged()
    );
  }

  public selectDisplayed(): Observable<boolean> {
    return this.select().pipe(
      map((s) => s.displayed),
      distinctUntilChanged()
    );
  }

  public toggleDisplayed(): void {
    this.settings.displayed = !this.settings.displayed;
    this.store();
    this.send();
  }

  public changeOrder(newOrder: string): void {
    this.settings.tileOrder = newOrder;
    this.store();
    this.send();
  }

  private store(): void {
    const config: GuiConfigMyTeamDisplay = { showTiles: this.settings.displayed, tileOrder: this.settings.tileOrder };
    this.guiConfigStore.changeMyTeamDisplay(config);
  }

  private send(): void {
    this.settings$.next({ ...this.settings });
  }
}
