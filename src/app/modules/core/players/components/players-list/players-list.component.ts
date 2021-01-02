import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersDisplaySettings } from 'src/app/modules/core/players/models/players-display-settings.model';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements AfterViewInit, OnChanges {
  @Input() players: PlayerUi[];
  @Input() showAddToMyTeamButton: boolean;
  @Input() showRemoveFromMyTeamButton: boolean;

  private settings: PlayersDisplaySettings;

  public playersToDisplay: PlayerUi[] = [];
  public readonly DISPLAY_KEY = 'list';

  constructor(private displaySettingsService: PlayersDisplaySettingsService) {}

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

  public trackPlayersBy(index, player: PlayerUi): string {
    return player.id;
  }

  private preparePlayers(): void {
    Logger.logDev(`players list component, preparing players, count ${!!this.players ? this.players.length : 0}`);
    let lengthSet = false;
    this.playersToDisplay = !!this.players ? [...this.players] : [];

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
