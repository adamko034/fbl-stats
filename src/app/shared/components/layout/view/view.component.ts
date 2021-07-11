import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { SidenavService } from 'src/app/services/sidenav.service';
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

  constructor(
    private screenSizeService: ScreenSizeService,
    private sidenavService: SidenavService,
    private activeRoute: Router
  ) {}

  public ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }

  public toggleSidenav(): void {
    this.sidenavService.toggleOnMobile();
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
