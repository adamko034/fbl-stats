import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { ViewTabNavigationLink } from '../view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {
  @Input() links: ViewTabNavigationLink[];
  @Input() disablePagination = false;

  public isMobile$: Observable<boolean>;
  public lastUpdated$: Observable<Date>;

  constructor(
    private screenSizeService: ScreenSizeService,
    private activeRoute: Router,
    private propertiesStore: PropertiesStore
  ) {}

  public ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.isMobile$();
    this.lastUpdated$ = this.propertiesStore.selectLastUpdated();
  }

  public activePageLabel(): string {
    const url = this.activeRoute.routerState.snapshot.url.toString();
    const urlWithoutParams = url.includes('?') ? url.substring(0, url.indexOf('?')) : url;

    if (this.links) {
      var link = this.links.find((x) => urlWithoutParams.includes(x.routerLink));
      return link?.labelMobile || 'Select page';
    }

    return 'Select page';
  }
}
