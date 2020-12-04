import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { PlayersView } from 'src/app/layout/content/models/players-view.enum';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { PlayersState } from 'src/app/store/players/players-state.model';
import { PlayersStore } from 'src/app/store/players/players.store';
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

  public isMobile: boolean;

  constructor(
    private playersStore: PlayersStore,
    private propertiesService: PropertiesService,
    private filtersStoreService: FiltersStoreService,
    private playersDataService: PlayersDataService,
    private playersDisplaySettingsService: PlayersDisplaySettingService,
    private changeDetector: ChangeDetectorRef,
    private screenSizeService: ScreenSizeService
  ) {
    this.isMobile = this.screenSizeService.isMobile();
  }

  public ngOnInit() {
    Logger.logDev('players table container component, ng on init');
    combineLatest([
      this.propertiesService.selectLastMatchday(),
      this.filtersStoreService.selectFilters(),
      this.playersStore.selectPlayers(),
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

    this.screenSizeService
      .onResize()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((screenSize) => {
        this.isMobile = screenSize === ScreenSize.XS;
        this.changeDetector.detectChanges();
      });
  }

  public ngOnDestroy() {
    Logger.logDev('players table container component, ng on destroy');
    this.destroyed$.next();
    this.playersStore.close();
  }

  private shouldFilter(filters: PlayersFilters, playersState: PlayersState): boolean {
    return !!filters && !!filters.position && !!playersState && !!playersState[filters.position];
  }
}
