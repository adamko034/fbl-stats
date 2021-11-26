import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';
import { MatchdayTipsOurPicksDisplay } from '../../../../models/matchday-tips-our-picks-display.enum';
import { MatchdayTipsOurPicksDisplaySettingsService } from '../../../../services/matchday-tips-our-picks-display-settings.service';

@UntilDestroy()
@Component({
  selector: 'app-matchday-tips-our-picks-players-extended',
  templateUrl: './matchday-tips-our-picks-players-extended.component.html',
  styleUrls: ['./matchday-tips-our-picks-players-extended.component.scss']
})
export class MatchdayTipsOurPicksPlayersExtendedComponent implements OnInit {
  @Input() ourPicks: MatchdayTipsOurPicksPlayers;

  public display: MatchdayTipsOurPicksDisplay;
  public displays = MatchdayTipsOurPicksDisplay;

  public get foundPlayers(): boolean {
    return !!this.ourPicks?.players && this.ourPicks.players.length > 0;
  }

  constructor(private displaySettingsService: MatchdayTipsOurPicksDisplaySettingsService) {}

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
