import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { StartupLoadingService } from 'src/app/services/startup-loading.service';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';

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
  public showLoading$: Observable<boolean>;
  public showConent$: Observable<boolean>;

  constructor(
    private propertiesService: PropertiesService,
    private playersStore: PlayersStore,
    private startupLoading: StartupLoadingService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('app component, on init');
    this.propertiesService.loadLastUpdated();
    this.propertiesService.loadProperties();
    this.playersStore.loadAll();

    this.showLoading$ = this.startupLoading.selectAllLoaded();
    this.showConent$ = this.startupLoading.selectAllLoaded().pipe(delay(1000));
  }
}
