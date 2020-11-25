import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DeviceDetectorService } from 'ngx-device-detector';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { PlayersState } from 'src/app/layout/content/models/players-state.model';
import { PlayersView } from 'src/app/layout/content/models/players-view.enum';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { StoreService } from 'src/app/services/store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-table-container',
  templateUrl: './players-table-container.component.html',
  styleUrls: ['./players-table-container.component.scss']
})
export class PlayersTableContainerComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  public playersToDisplay: PlayerUi[];
  public view: PlayersView;
  public PlayersViews = PlayersView;

  public get isMobile(): boolean {
    return this.deviceDetectorService.isMobile();
  }

  constructor(
    private storeService: StoreService,
    private propertiesService: PropertiesService,
    private filtersStoreService: FiltersStoreService,
    private playersDataService: PlayersDataService,
    private playersDisplaySettingsService: PlayersDisplaySettingService,
    private deviceDetectorService: DeviceDetectorService,
    private changeDetector: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    Logger.logDev('players table container component, ng on init');
    combineLatest([
      this.propertiesService.selectLastMatchday(),
      this.filtersStoreService.selectFilters(),
      this.storeService.selectPlayers(),
      this.playersDisplaySettingsService.selectSettings()
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([lastMatchday, filters, playersState, displaySettings]) => {
        Logger.logDev('players table container component, ng on init subscription start');
        this.view = displaySettings.view;

        if (this.shouldFilter(filters, playersState)) {
          this.playersToDisplay = this.playersDataService.getPlayersToDisplay(
            cloneDeep(playersState[filters.position]),
            filters,
            lastMatchday,
            displaySettings.count
          );
        }

        this.changeDetector.detectChanges();
      });
  }

  public ngOnDestroy() {
    Logger.logDev('players table container component, ng on destroy');
    this.destroyed$.next();
    this.storeService.close();
  }

  private shouldFilter(filters: PlayersFilters, playersState: PlayersState): boolean {
    return !!filters && !!filters.position && !!playersState && !!playersState[filters.position];
  }
}
