import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { OurPicksDisplaySettings } from '../../models/our-picks-display-settings.model';
import { OurPicksView } from '../../models/our-picks-view.enum';
import { OurPicksDisplaySettingsService } from '../../services/our-picks-display-settings.service';
import { OurPicksFiltersExecutor } from '../../filters/our-picks-filters-executor';
import { OurPicksFiltersService } from '../../services/our-picks-filters.service';

@Component({
  selector: 'app-our-picks-players',
  templateUrl: './our-picks-players.component.html',
  styleUrls: ['./our-picks-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksPlayersComponent implements OnInit {
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
