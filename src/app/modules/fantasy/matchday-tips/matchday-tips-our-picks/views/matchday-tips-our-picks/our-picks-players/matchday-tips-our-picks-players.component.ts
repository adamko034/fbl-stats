import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayTipsOurPicksFiltersExecutor } from '../../../filters/matchday-tips-our-picks-filters-executor';
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

  public defenders$: Observable<MatchdayTipsOurPicksPlayer[]>;
  public goalkeepers$: Observable<MatchdayTipsOurPicksPlayer[]>;
  public mids$: Observable<MatchdayTipsOurPicksPlayer[]>;
  public forwards$: Observable<MatchdayTipsOurPicksPlayer[]>;

  constructor(
    private route: ActivatedRoute,
    private settingsService: MatchdayTipsOurPicksDisplaySettingsService,
    private filtersService: MatchdayTipsOurPicksFiltersService,
    private filtersExecutor: MatchdayTipsOurPicksFiltersExecutor,
    private displaySettings: MatchdayTipsOurPicksDisplaySettingsService
  ) {}

  ngOnInit(): void {
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
          .orderBy('order', 'asc')
          .collect();

        return { ...data.ourPicks, players: playersToDisplay };
      })
    );

    this.defenders$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'def'))
    );
    this.mids$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'mid'))
    );
    this.goalkeepers$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'gk'))
    );
    this.forwards$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'for'))
    );
  }
}
