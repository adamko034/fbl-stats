import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { combineLatest, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { PlayersView } from 'src/app/layout/content/models/players-view.enum';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-players-table-container',
  templateUrl: './players-table-container.component.html',
  styleUrls: ['./players-table-container.component.scss']
})
export class PlayersTableContainerComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  public loading = true;
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
      .pipe(
        tap(() => {
          if (!this.loading) {
            this.loading = true;
          }
        }),
        delay(100),
        takeUntil(this.destroyed$)
      )
      .subscribe(([lastMatchday, filters, playersState, displaySettings]) => {
        Logger.logDev('players table container component, ng on init subscription start');
        this.view = displaySettings.view;

        this.playersToDisplay = this.playersDataService.getPlayersToDisplay(
          cloneDeep(playersState.players),
          filters,
          lastMatchday,
          displaySettings.count
        );

        this.loading = false;
      });

    this.screenSizeService
      .onResize()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((screenSize) => {
        this.isMobile = screenSize === ScreenSize.XS;
      });
  }

  public ngOnDestroy() {
    Logger.logDev('players table container component, ng on destroy');
    this.destroyed$.next();
    this.playersStore.close();
  }
}
