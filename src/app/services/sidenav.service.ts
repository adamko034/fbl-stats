import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { GuiConfigStore } from '../store/gui-config/gui-config.store';

export interface SidenavConfig {
  expanded: boolean;
  openedOnMobile: boolean;
}

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private config: SidenavConfig = { expanded: true, openedOnMobile: false };
  private config$ = new ReplaySubject<SidenavConfig>(1);

  constructor(private guiConfigStore: GuiConfigStore) {
    this.guiConfigStore.selectSideNavExpanded().subscribe((expanded) => {
      this.config.expanded = expanded;
      this.send();
    });

    this.send();
  }

  public toggleOnMobile(): void {
    this.config.openedOnMobile = !this.config.openedOnMobile;
    this.send();
  }

  public toggleExpanded(): void {
    this.config.expanded = !this.config.expanded;
    this.guiConfigStore.toggleSideNavExpanded();
    this.send();
  }

  public selectSidenavConfig(): Observable<SidenavConfig> {
    return this.config$.pipe(distinctUntilChanged());
  }

  private send(): void {
    this.config$.next({ ...this.config });
  }
}
