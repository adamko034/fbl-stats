import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksDisplay } from '../../../models/our-picks-display.enum';
import { OurPicksFilters } from '../../../models/our-picks-filters.model';
import { OurPicksDisplaySettingsService } from '../../../services/our-picks-display-settings.service';
import { OurPicksFiltersExecutor } from '../../../filters/our-picks-filters-executor';
import { OurPicksFiltersService } from '../../../services/our-picks-filters.service';

@UntilDestroy()
@Component({
  selector: 'app-our-picks-players-extended',
  templateUrl: './our-picks-players-extended.component.html',
  styleUrls: ['./our-picks-players-extended.component.scss']
})
export class OurPicksPlayersExtendedComponent implements OnInit {
  @Input() ourPicks: OurPicksPlayers;

  public display: OurPicksDisplay;
  public displays = OurPicksDisplay;

  public get foundPlayers(): boolean {
    return !!this.ourPicks?.players && this.ourPicks.players.length > 0;
  }

  constructor(private displaySettingsService: OurPicksDisplaySettingsService) {}

  public ngOnInit(): void {
    this.displaySettingsService
      .selectAll()
      .pipe(
        map((settings) => settings.display),
        untilDestroyed(this)
      )
      .subscribe((display) => (this.display = display));
  }
}
