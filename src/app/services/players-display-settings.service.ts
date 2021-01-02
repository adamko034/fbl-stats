import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { PlayersDisplaySettings } from 'src/app/layout/content/models/players-display-settings.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class PlayersDisplaySettingService {
  private readonly PLAYERS_DISPLAY_KEY = 'PlayersPageSize';

  private state: PlayersDisplaySettings;
  private settings$: ReplaySubject<PlayersDisplaySettings>;

  constructor(private localStorageService: LocalStorageService) {
    this.settings$ = new ReplaySubject<PlayersDisplaySettings>(1);

    this.state = this.getInitialData();
    this.sendSettings();
  }

  public selectSettings(): Observable<PlayersDisplaySettings> {
    return this.settings$.pipe(distinctUntilChanged());
  }

  public getInitialData(): PlayersDisplaySettings {
    const fromLocalStorage = this.localStorageService.get<PlayersDisplaySettings>(this.PLAYERS_DISPLAY_KEY);

    return {
      count: fromLocalStorage?.count || 15
    };
  }

  public selectPlayersCount(): Observable<number> {
    return this.settings$.pipe(map((s) => s.count));
  }

  public updatePlayersCount(newValue: number): void {
    this.state.count = newValue;
    this.sendSettings();
  }

  private sendSettings(): void {
    this.localStorageService.upsert<PlayersDisplaySettings>(this.PLAYERS_DISPLAY_KEY, this.state);
    this.settings$.next({ ...this.state });
  }
}
