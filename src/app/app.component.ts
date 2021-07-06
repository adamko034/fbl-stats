import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay } from 'rxjs/operators';
import { SidenavService } from 'src/app/services/sidenav.service';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { ScreenSizeService } from './services/screen-size.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':leave', [style({ opacity: 1 }), animate('1s ease-out', style({ opacity: 0 }))])
    ])
  ]
})
export class AppComponent implements OnInit {
  private isMobile: boolean;
  private sideNavOpenedOnMobile = false;
  public loading = true;

  public get sideNavMode(): string {
    return this.isMobile ? 'over' : 'side';
  }

  constructor(
    private propertiesService: PropertiesStore,
    private playersStore: PlayersStore,
    private sidenavService: SidenavService,
    private teamsStore: TeamsStore,
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('app component, on init, loading data');
    //this.propertiesService.loadLastUpdated();
    this.propertiesService.loadProperties();
    this.playersStore.loadAll();
    this.teamsStore.load();

    //this.sidenavOpened$ = this.sidenavService.selectOpened();
    this.screenSizeService
      .isMobile$()
      .pipe(untilDestroyed(this))
      .subscribe((isMobile) => (this.isMobile = isMobile));

    this.router.events.pipe(delay(100), untilDestroyed(this)).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.loading = false;

        if (this.sideNavOpenedOnMobile) {
          this.sideNavOpenedOnMobile = false;
        }
      }
    });
  }

  public isSideNavOpened(): boolean {
    return !this.isMobile || (this.isMobile && this.sideNavOpenedOnMobile);
  }

  public toggleSideNav(): void {
    this.sideNavOpenedOnMobile = !this.sideNavOpenedOnMobile;
  }
}
