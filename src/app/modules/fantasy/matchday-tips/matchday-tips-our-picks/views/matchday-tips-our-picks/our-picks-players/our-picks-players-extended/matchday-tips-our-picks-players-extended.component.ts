import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksDisplay } from '../../../../models/our-picks-display.enum';
import { OurPicksDisplaySettingsService } from '../../../../services/our-picks-display-settings.service';

@UntilDestroy()
@Component({
  selector: 'app-matchday-tips-our-picks-players-extended',
  templateUrl: './matchday-tips-our-picks-players-extended.component.html',
  styleUrls: ['./matchday-tips-our-picks-players-extended.component.scss']
})
export class MatchdayTipsOurPicksPlayersExtendedComponent implements OnInit {
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
