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
import { Observable } from 'rxjs/internal/Observable';
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
  public loading = true;
  public sidenavOpened$: Observable<boolean>;
  public isMobile$: Observable<boolean>;

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

    this.sidenavOpened$ = this.sidenavService.selectOpened();
    this.isMobile$ = this.screenSizeService.isMobile$();

    this.router.events.pipe(delay(100), untilDestroyed(this)).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.loading = false;
      }
    });
  }

  public closeSidenav(): void {
    this.sidenavService.close();
  }
}
