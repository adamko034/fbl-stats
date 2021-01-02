import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersUiConverter } from 'src/app/modules/core/players/converters/players-ui.converter';
import { PlayersFilterService } from 'src/app/modules/core/players/filter/players-filter.service';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { PlayersViewService } from 'src/app/modules/core/players/services/players-view.service';
import { MyTeamPlayersFitler } from 'src/app/modules/my-team/filters/my-team-players.filter';
import { MyTeamPlayersFitlersService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-players-filters.service';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-my-team-table-container',
  templateUrl: './my-team-table-container.component.html',
  styleUrls: ['./my-team-table-container.component.scss'],
  providers: [PlayersFilterService]
})
export class MyTeamTableContainerComponent implements OnInit {
  public players$: Observable<PlayerUi[]>;
  public view$: Observable<PlayersView>;

  public views = PlayersView;

  constructor(
    private myTeamService: MyTeamStore,
    private playersUiConverter: PlayersUiConverter,
    private propertiesService: PropertiesService,
    private myTeamPlayersFilters: MyTeamPlayersFitlersService,
    private playersViewService: PlayersViewService
  ) {}

  public ngOnInit(): void {
    this.view$ = this.playersViewService.select();
    this.players$ = combineLatest([
      this.myTeamService.select(),
      this.myTeamPlayersFilters.select(),
      this.propertiesService.selectLastMatchday()
    ]).pipe(
      map(([players, filters, lastMatchday]) => {
        Logger.logDev('my tam table container, on init subscription');
        const filter = new MyTeamPlayersFitler(filters, lastMatchday);
        return new ArrayStream<Player>(players)
          .filter(filter)
          .convert(this.playersUiConverter)
          .orderBy('form', 'dsc')
          .collect();
      })
    );
  }
}
