import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayersUiConverter } from 'src/app/modules/core/players/converters/players-ui.converter';
import { PlayersFilterService } from 'src/app/modules/core/players/filter/players-filter.service';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { PlayersViewService } from 'src/app/modules/core/players/services/players-view.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';
import { MyTeamPlayersFitler } from '../../../filters/my-team-players.filter';
import { MyTeamPlayersFilters } from '../../../models/my-team-players-filters.model';

@Component({
  selector: 'app-my-team-table-container',
  templateUrl: './my-team-table-container.component.html',
  styleUrls: ['./my-team-table-container.component.scss'],
  providers: [PlayersFilterService]
})
export class MyTeamTableContainerComponent implements OnInit {
  @Input() players: Player[];
  @Input() lastMatchday: number;
  @Input() filters: MyTeamPlayersFilters;

  private _playersUi: PlayerUi[] = [];
  public get playersUi(): PlayerUi[] {
    return this._playersUi;
  }

  public view$: Observable<PlayersView>;
  public views = PlayersView;

  constructor(private playersUiConverter: PlayersUiConverter, private playersViewService: PlayersViewService) {}

  public ngOnInit(): void {
    this.view$ = this.playersViewService.select();
    this.setPlayersUi();
  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.players || simpleChanges.filters) {
      Logger.logDev('my team table container, got players changes, setting players ui');
      this.setPlayersUi();
    }
  }

  private setPlayersUi() {
    this._playersUi = new ArrayStream<Player>(this.players)
      .filter(new MyTeamPlayersFitler(this.filters, this.lastMatchday))
      .convert(this.playersUiConverter)
      .orderBy('form', 'dsc')
      .collect();
  }
}
