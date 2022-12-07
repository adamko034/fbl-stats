import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTabNav } from '@angular/material/tabs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';
import { ViewTabNavigationLink } from './model/view-tab-navigation-link.model';

@UntilDestroy()
@Component({
  selector: 'app-view-tabs-navigation',
  templateUrl: './view-tabs-navigation.component.html',
  styleUrls: ['./view-tabs-navigation.component.scss']
})
export class ViewTabsNavigationComponent implements AfterViewInit {
  @Input() links: ViewTabNavigationLink[];
  @Input() disablePagination = false;

  @ViewChild(MatTabNav, { static: false }) tabs: MatTabNav;

  constructor(private guiStore: GuiConfigStore) {}

  public ngAfterViewInit(): void {
    this.guiStore
      .selectSidenavOpened()
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        setTimeout(() => {
          this.tabs._alignInkBarToSelectedTab();
        }, 500);
      });
  }
}
