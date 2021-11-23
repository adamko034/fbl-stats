import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { OurPicksFiltersExecutor } from '../../../filters/our-picks-filters-executor';
import { OurPicksView } from '../../../models/our-picks-view.enum';
import { OurPicksDisplaySettingsService } from '../../../services/our-picks-display-settings.service';
import { OurPicksFiltersService } from '../../../services/our-picks-filters.service';

@Component({
  selector: 'app-matchday-tips-our-picks-players',
  templateUrl: './matchday-tips-our-picks-players.component.html',
  styleUrls: ['./matchday-tips-our-picks-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksPlayersComponent implements OnInit {
  public ourPicks$: Observable<OurPicksPlayers>;
  public view$: Observable<OurPicksView>;

  public Views = OurPicksView;

  constructor(
    private route: ActivatedRoute,
    private settingsService: OurPicksDisplaySettingsService,
    private filtersService: OurPicksFiltersService,
    private filtersExecutor: OurPicksFiltersExecutor,
    private displaySettings: OurPicksDisplaySettingsService
  ) {}

  ngOnInit(): void {
    this.view$ = this.settingsService.selectAll().pipe(map((settings) => settings.view));
    this.ourPicks$ = combineLatest([
      this.route.data,
      this.filtersService.selectAll(),
      this.displaySettings.selectAll()
    ]).pipe(
      map(([data, filters, { sortBy }]) => {
        let playersToDisplay = [...data.ourPicks?.players] || [];
        if (!!filters) {
          playersToDisplay = this.filtersExecutor.filter(playersToDisplay, filters);
        }

        playersToDisplay = new ArrayStream<OurPicksPlayer>(playersToDisplay)
          .orderBy(sortBy.sortByItem.value, sortBy.direction === 'asc' ? 'asc' : 'dsc')
          .collect();

        return { ...data.ourPicks, players: playersToDisplay };
      })
    );
  }
}
