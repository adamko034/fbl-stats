import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayTipsOurPicksFiltersExecutor } from '../../../filters/matchday-tips-our-picks-filters-executor';
import { MatchdayTipsOurPicksView } from '../../../models/matchday-tips-our-picks-view.enum';
import { MatchdayTipsOurPicksDisplaySettingsService } from '../../../services/matchday-tips-our-picks-display-settings.service';
import { MatchdayTipsOurPicksFiltersService } from '../../../services/matchday-tips-our-picks-filters.service';

@Component({
  selector: 'app-matchday-tips-our-picks-players',
  templateUrl: './matchday-tips-our-picks-players.component.html',
  styleUrls: ['./matchday-tips-our-picks-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksPlayersComponent implements OnInit {
  public ourPicks$: Observable<MatchdayTipsOurPicksPlayers>;
  public view$: Observable<MatchdayTipsOurPicksView>;

  public Views = MatchdayTipsOurPicksView;

  constructor(
    private route: ActivatedRoute,
    private settingsService: MatchdayTipsOurPicksDisplaySettingsService,
    private filtersService: MatchdayTipsOurPicksFiltersService,
    private filtersExecutor: MatchdayTipsOurPicksFiltersExecutor,
    private displaySettings: MatchdayTipsOurPicksDisplaySettingsService
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

        playersToDisplay = new ArrayStream<MatchdayTipsOurPicksPlayer>(playersToDisplay)
          .orderBy(sortBy.sortByItem.value, sortBy.direction === 'asc' ? 'asc' : 'dsc')
          .collect();

        return { ...data.ourPicks, players: playersToDisplay };
      })
    );
  }
}
