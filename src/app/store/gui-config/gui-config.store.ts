import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
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

  public selectPlayersView(): Observable<PlayersView> {
    return this.config$.pipe(
      map((x) => x.players?.view || PlayersView.TABLE),
      distinctUntilChanged()
    );
  }

  public toggleSideNavExpanded(): void {
    this.config.sidenavExpanded = !this.config.sidenavExpanded;
    this.send();
  }

  public changePlayersView(view: PlayersView): void {
    this.config.players = { ...this.config.players, view };
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

  public changeComparePlayersMatchdaysCount(fixturesCount: number): void {
    this.config.comparePlayers = { ...this.config.comparePlayers, includeMatchdays: fixturesCount };
    this.send();
  }

  public changeComparePlayersIds(ids: string[]): void {
    this.config.comparePlayers = { ...this.config.comparePlayers, ids };
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
    return { sidenavExpanded: true, players: { view: PlayersView.TABLE } };
  }
}
