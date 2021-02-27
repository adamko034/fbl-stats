import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksDisplay } from '../../models/our-picks-display.enum';
import { OurPicksFilters } from '../../models/our-picks-filters.model';
import { OurPicksDisplaySettingsService } from '../../services/our-picks-display-settings.service';
import { OurPicksFiltersExecutor } from '../../services/our-picks-filters-executor';
import { OurPicksFiltersService } from '../../services/our-picks-filters.service';

@UntilDestroy()
@Component({
  selector: 'app-our-picks-players',
  templateUrl: './our-picks-players.component.html',
  styleUrls: ['./our-picks-players.component.scss']
})
export class OurPicksPlayersComponent implements OnInit {
  @Input() ourPicks: OurPicksPlayers;

  public players: OurPicksPlayer[];
  public display: OurPicksDisplay;
  public displays = OurPicksDisplay;

  public get published(): boolean {
    return this.ourPicks?.published || false;
  }

  constructor(
    private filtersService: OurPicksFiltersService,
    private filtersExecutor: OurPicksFiltersExecutor,
    private displaySettingsService: OurPicksDisplaySettingsService
  ) {}

  public ngOnInit(): void {
    this.players = [...this.ourPicks?.players] || [];
    this.filtersService.selectAll().subscribe((filters: OurPicksFilters) => {
      if (!!filters) this.players = this.filtersExecutor.filter([...this.ourPicks.players], filters);
    });

    this.displaySettingsService
      .selectAll()
      .pipe(
        map((settings) => settings.display),
        untilDestroyed(this)
      )
      .subscribe((display) => (this.display = display));
  }
}
