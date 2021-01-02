import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { combineLatest, Observable, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';
import { PlayersDataService } from 'src/app/layout/content/components/players-table-container/services/players-data.service';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { PlayersViewService } from 'src/app/modules/core/players/services/players-view.service';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { PropertiesService } from 'src/app/services/properties.service';
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
  public PlayersViews = PlayersView;

  public view$: Observable<PlayersView>;

  constructor(
    private playersStore: PlayersStore,
    private propertiesService: PropertiesService,
    private filtersStoreService: FiltersStoreService,
    private playersDataService: PlayersDataService,
    private playersDisplaySettingsService: PlayersDisplaySettingService,
    private playersViewService: PlayersViewService
  ) {}

  public ngOnInit() {
    Logger.logDev('players table container component, ng on init');
    this.view$ = this.playersViewService.select();
    combineLatest([
      this.propertiesService.selectLastMatchday(),
      this.filtersStoreService.selectFilters(),
      this.playersStore.selectPlayers()
    ])
      .pipe(
        tap(() => (this.loading = true)),
        delay(0),
        filter(([lastMatchday, filters, playersState]) => {
          return !!lastMatchday && lastMatchday !== 0 && !!filters && !!playersState;
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe(([lastMatchday, filters, playersState]) => {
        Logger.logDev('players table container component, ng on init subscription start');

        this.playersToDisplay = this.playersDataService.getPlayersToDisplay(
          cloneDeep(playersState.players),
          filters,
          lastMatchday
        );

        this.loading = false;
      });
  }

  public ngOnDestroy() {
    Logger.logDev('players table container component, ng on destroy');
    this.destroyed$.next();
  }
}
