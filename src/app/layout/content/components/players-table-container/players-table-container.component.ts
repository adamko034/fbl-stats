import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { PlayersState } from 'src/app/layout/content/models/players-state.model';
import { PlayersView } from 'src/app/layout/content/models/players-view.enum';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-players-table-container',
  templateUrl: './players-table-container.component.html',
  styleUrls: ['./players-table-container.component.scss']
})
export class PlayersTableContainerComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  private playersState: PlayersState;

  public playersToDisplay: PlayerUi[] = [];
  public view: PlayersView;
  public PlayersViews = PlayersView;

  constructor(
    private storeService: StoreService,
    private propertiesService: PropertiesService,
    private filtersStoreService: FiltersStoreService,
    private playersDataService: PlayersDataService,
    private playersDisplaySettingsService: PlayersDisplaySettingService
  ) {}

  public ngOnInit() {
    combineLatest([
      this.propertiesService.selectLastMatchday(),
      this.filtersStoreService.selectFilters(),
      this.storeService.selectPlayers(),
      this.playersDisplaySettingsService.selectSettings()
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([lastMatchday, filters, playersState, displaySettings]) => {
        this.playersState = playersState;
        this.view = displaySettings.view;

        if (this.shouldFilter(filters)) {
          this.playersToDisplay = this.playersDataService.getPlayersToDisplay(
            cloneDeep(this.playersState[filters.position]),
            filters,
            lastMatchday,
            displaySettings.count
          );
        }
      });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.storeService.close();
  }

  private shouldFilter(filters: PlayersFilters): boolean {
    return !!filters && !!filters.position && !!this.playersState && !!this.playersState[filters.position];
  }
}
