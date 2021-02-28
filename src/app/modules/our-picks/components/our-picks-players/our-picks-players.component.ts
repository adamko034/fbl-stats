import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksView } from '../../models/our-picks-view.enum';
import { OurPicksDisplaySettingsService } from '../../services/our-picks-display-settings.service';
import { OurPicksFiltersExecutor } from '../../services/our-picks-filters-executor';
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
    private filtersExecutor: OurPicksFiltersExecutor
  ) {}

  ngOnInit(): void {
    this.view$ = this.settingsService.selectAll().pipe(map((settings) => settings.view));
    this.ourPicks$ = combineLatest([this.route.data, this.filtersService.selectAll()]).pipe(
      map(([data, filters]) => {
        let playersToDisplay = [...data.ourPicks?.players] || [];
        if (!!filters) {
          playersToDisplay = this.filtersExecutor.filter(playersToDisplay, filters);
        }

        return { ...data.ourPicks, players: playersToDisplay };
      })
    );
  }
}
