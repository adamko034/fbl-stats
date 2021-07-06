import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GuiConfig } from './gui-config.model';

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
