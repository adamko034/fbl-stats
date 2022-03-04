import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GuiConfig, GuiConfigComparePlayers, GuiConfigMyTeamDisplay, GuiConfigOurPicks } from './gui-config.model';

@Injectable({ providedIn: 'root' })
export class GuiConfigStore {
  private key = 'fantasy_fbl_stats';
  private config: GuiConfig;
  private config$: ReplaySubject<GuiConfig> = new ReplaySubject(1);

  public constructor(private localStorageService: LocalStorageService) {
    this.config = this.getGuiConfig();
    this.send();
  }

  public selectSideNavExpanded(): Observable<boolean> {
    return this.config$.pipe(
      map((x) => x.sidenavExpanded),
      distinctUntilChanged()
    );
  }

  public toggleSideNavExpanded(): void {
    this.config.sidenavExpanded = !this.config.sidenavExpanded;
    this.send();
  }

  public selectPlayersFiltersMatchdays(): Observable<number> {
    return this.config$.pipe(
      map((x) => x.players?.matchdays),
      distinctUntilChanged()
    );
  }

  public changePlayersFiltersMatchdays(matchdays: number): void {
    this.config.players = { ...this.config.players, matchdays };
    this.send();
  }

  public selectOurPicksDisplaySettings(): Observable<GuiConfigOurPicks> {
    return this.config$.pipe(
      map((x) => x.ourPicks),
      distinctUntilChanged()
    );
  }

  public changeOurPicksDisplaySettings(config: GuiConfigOurPicks): void {
    this.config.ourPicks = config;
    this.send();
  }

  public selectMyTeamPlayerIds(): Observable<string[]> {
    return this.config$.pipe(
      map((x) => x.myTeam?.playerIds),
      distinctUntilChanged()
    );
  }

  public selectMyTeamDisplay(): Observable<GuiConfigMyTeamDisplay> {
    return this.config$.pipe(
      map((x) => x.myTeam?.display),
      distinctUntilChanged()
    );
  }

  public selectMyTeamKickOffTimesMatchdays(): Observable<number> {
    return this.config$.pipe(
      map((x) => x.myTeam?.kickOffTimesMatchdays),
      distinctUntilChanged()
    );
  }

  public changeMyTeamPlayerIds(ids: string[]): void {
    this.config.myTeam = { ...this.config.myTeam, playerIds: ids };
    this.send();
  }

  public changeMyTeamDisplay(config: GuiConfigMyTeamDisplay): void {
    this.config.myTeam = { ...this.config.myTeam, display: config };
    this.send();
  }

  public selectComparePlayersConfig(): Observable<GuiConfigComparePlayers> {
    return this.config$.pipe(map((config) => config.comparePlayers));
  }

  public changeComparePlayersIds(ids: string[]): void {
    this.config.comparePlayers = { ...this.config.comparePlayers, ids };
    this.send();
  }

  public changeMyTeamKickOffMatchdays(matchdaysCount: number): void {
    this.config.myTeam = { ...this.config.myTeam, kickOffTimesMatchdays: matchdaysCount };
    this.send();
  }

  private rememberGuiConfig(): void {
    this.localStorageService.upsert<GuiConfig>(this.key, this.config);
  }

  private getGuiConfig(): GuiConfig {
    return this.localStorageService.get<GuiConfig>(this.key) || this.defaultConfig();
  }

  private send(): void {
    this.rememberGuiConfig();
    this.config$.next({ ...this.config });
  }

  private defaultConfig(): GuiConfig {
    return { sidenavExpanded: true };
  }
}
