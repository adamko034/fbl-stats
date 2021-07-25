import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersDisplaySettings } from 'src/app/modules/core/players/models/players-display-settings.model';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() players: PlayerUi[];
  @Input() showAddToMyTeamButton: boolean;
  @Input() showRemoveFromMyTeamButton: boolean;

  private settings: PlayersDisplaySettings;

  public playersToDisplay: PlayerUi[] = [];
  public sortItems: SortByItem[] = [
    { text: 'Form', value: 'form' },
    { text: 'Price', value: 'price' },
    { text: 'Popularity', value: 'popularity' },
    { text: 'Total points', value: 'totalPoints' }
  ];
  public sortBy: SortBy;
  public readonly DISPLAY_KEY = 'list';

  constructor(
    private displaySettingsService: PlayersDisplaySettingsService,
    private properitesStore: PropertiesStore
  ) {}

  public ngOnInit(): void {
    this.properitesStore
      .selectLastMatchday()
      .pipe(untilDestroyed(this))
      .subscribe((lastMatchday) => {
        const sortByField = lastMatchday > 0 ? 'form' : 'price';
        const sortByItem = this.sortItems.filter((x) => x.value === sortByField)[0];
        this.sortBy = { direction: 'desc', value: sortByField, sortByItem };
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!!changes.players && !changes.players.isFirstChange()) {
      if (!!this.settings) {
        this.settings.paginator.firstPage();
      }
      this.preparePlayers();
    }
  }

  public ngAfterViewInit(): void {
    this.displaySettingsService.select(this.DISPLAY_KEY).subscribe((settings: PlayersDisplaySettings) => {
      this.settings = settings;
      this.settings.paginator.firstPage();

      this.preparePlayers();

      this.settings.paginator.page.subscribe(() => this.preparePlayers());
    });
  }

  public onSortChange(sortBy: SortBy) {
    this.sortBy = { ...sortBy };
    this.preparePlayers();
  }

  public trackPlayersBy(index, player: PlayerUi): string {
    return player.id;
  }

  private preparePlayers(): void {
    Logger.logDev(`players list component, preparing players, count ${!!this.players ? this.players.length : 0}`);
    let lengthSet = false;
    this.playersToDisplay = !!this.players ? [...this.players] : [];
    this.playersToDisplay = new ArrayStream<PlayerUi>(this.playersToDisplay)
      .orderBy(this.sortBy.sortByItem.value, this.sortBy.direction === 'asc' ? 'asc' : 'dsc')
      .collect();

    if (!!this.settings && this.playersToDisplay.length > 0) {
      if (!!this.settings.searchTerm) {
        this.playersToDisplay = this.players.filter((p) =>
          p.name.toLowerCase().includes(this.settings.searchTerm.toLowerCase())
        );
        this.settings.paginator.length = this.playersToDisplay.length;
        lengthSet = true;
      }

      this.playersToDisplay = this.playersToDisplay.slice(
        this.settings.paginator.pageIndex * this.settings.paginator.pageSize,
        this.settings.paginator.pageIndex * this.settings.paginator.pageSize + this.settings.paginator.pageSize
      );

      if (!lengthSet) {
        this.settings.paginator.length = this.players.length;
      }
    }
  }
}
