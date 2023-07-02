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
import { Observable } from 'rxjs';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { ScreenSizeService } from './services/screen-size.service';
import { SidenavService } from './services/sidenav.service';
import { FixturesStore } from './store/fixtures/fixtures.store';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isMobile: boolean;
  public loading = true;

  public get sideNavMode(): string {
    return this.isMobile ? 'over' : 'side';
  }

  public sidenavOpened$: Observable<boolean>;
  public lastUpdated$: Observable<Date>;

  constructor(
    private propertiesService: PropertiesStore,
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private router: Router,
    private screenSizeService: ScreenSizeService,
    private fixturesStore: FixturesStore,
    private sidenavService: SidenavService
  ) {
    Logger.logDev('app component, constructor, loading data');
    this.playersStore.loadAll();
  }

  public ngOnInit(): void {
    Logger.logDev('app component, on init, loading data');
    //this.propertiesService.loadLastUpdated();
    this.propertiesService.loadProperties();

    this.teamsStore.load();
    this.fixturesStore.load();

    this.sidenavOpened$ = this.sidenavService.opened$;
    this.lastUpdated$ = this.propertiesService.selectLastUpdated();

    this.screenSizeService
      .isMobile$()
      .pipe(untilDestroyed(this))
      .subscribe((isMobile) => (this.isMobile = isMobile));

    this.router.events.pipe(untilDestroyed(this)).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.loading = false;
      }
    });
  }

  public toggleSideNav(): void {
    this.sidenavService.toggle();
  }
}
