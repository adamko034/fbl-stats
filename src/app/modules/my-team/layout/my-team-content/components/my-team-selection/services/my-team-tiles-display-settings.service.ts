import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MyTeamTilesDisplaySettings } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/models/my-team-tiles-display-settings.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class MyTeamTilesDisplaySettingsService {
  private readonly STORAGE_KEY = 'MyTeam_DisplaySettings';
  private settings: MyTeamTilesDisplaySettings;
  private settings$ = new ReplaySubject<MyTeamTilesDisplaySettings>(1);

  constructor(private localStorageService: LocalStorageService) {
    this.settings = this.localStorageService.get<MyTeamTilesDisplaySettings>(this.STORAGE_KEY) || this.initialData();
    this.send();
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
    this.localStorageService.upsert<MyTeamTilesDisplaySettings>(this.STORAGE_KEY, this.settings);
  }

  private send(): void {
    this.settings$.next({ ...this.settings });
  }

  private initialData(): MyTeamTilesDisplaySettings {
    return { displayed: true, tileOrder: '-price' };
  }
}
