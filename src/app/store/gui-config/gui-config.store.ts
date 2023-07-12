import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GuiConfig, GuiConfigComparePlayers, GuiConfigMyTeamDisplay } from './gui-config.model';

@Injectable({ providedIn: 'root' })
export class GuiConfigStore {
  private key = 'fantasy_fbl_stats';
  private config: GuiConfig;
  private config$: ReplaySubject<GuiConfig> = new ReplaySubject(1);

  constructor(private localStorageService: LocalStorageService) {
    this.config = this.getGuiConfig();
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

  public selectPageTitle(): Observable<string> {
    return this.config$.pipe(
      map((config) => config.pageTitle ?? ''),
      distinctUntilChanged()
    );
  }

  public selectPageTitleMobile(): Observable<string> {
    return this.config$.pipe(
      map((config) => config.pageTitleMobile ?? ''),
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

  public changePageTitle(pageTitle: string, pageTitleMobile: string): void {
    this.config.pageTitle = pageTitle;
    this.config.pageTitleMobile = pageTitleMobile;
    this.send(false);
  }

  private rememberGuiConfig(): void {
    const { pageTitle: _, ...configToStore } = this.config;
    this.localStorageService.upsert<GuiConfig>(this.key, configToStore);
  }

  private getGuiConfig(): GuiConfig {
    return this.localStorageService.get<GuiConfig>(this.key) || {};
  }

  private send(toLocalStorage: boolean = true): void {
    if (toLocalStorage) {
      this.rememberGuiConfig();
    }

    this.config$.next({ ...this.config });
  }
}
