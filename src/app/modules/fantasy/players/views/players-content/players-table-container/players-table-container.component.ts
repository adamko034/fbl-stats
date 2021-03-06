import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, Observable, combineLatest } from 'rxjs';
import { tap, delay, filter, takeUntil } from 'rxjs/operators';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { PlayersViewService } from 'src/app/modules/core/players/services/players-view.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersDataService } from '../../../../../core/players/services/players-data.service';

@UntilDestroy()
@Component({
  selector: 'app-players-table-container',
  templateUrl: './players-table-container.component.html',
  styleUrls: ['./players-table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableContainerComponent implements OnInit {
  public loading = true;
  public playersToDisplay: PlayerUi[];
  public PlayersViews = PlayersView;

  public view$: Observable<PlayersView>;

  constructor(
    private playersStore: PlayersStore,
    private propertiesService: PropertiesService,
    private filtersStoreService: FiltersStoreService,
    private playersDataService: PlayersDataService,
    private playersViewService: PlayersViewService,
    private changeDetection: ChangeDetectorRef
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
        tap(() => {
          this.loading = true;
          this.changeDetection.detectChanges();
        }),
        filter(([lastMatchday, filters, playersState]) => {
          return !!lastMatchday && lastMatchday !== 0 && !!filters && !!playersState;
        }),
        untilDestroyed(this)
      )
      .subscribe(([lastMatchday, filters, players]) => {
        Logger.logDev('players table container component, ng on init subscription start');

        this.playersToDisplay = this.playersDataService.getPlayersToDisplay(
          new ArrayStream(players).collect(),
          filters,
          lastMatchday
        );

        this.loading = false;
        this.changeDetection.detectChanges();
      });
  }
}
