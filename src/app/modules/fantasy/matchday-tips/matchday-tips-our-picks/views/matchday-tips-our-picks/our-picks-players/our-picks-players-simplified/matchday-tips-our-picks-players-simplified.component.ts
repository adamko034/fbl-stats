import { Component, Input } from '@angular/core';
import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-matchday-tips-our-picks-players-simplified',
  templateUrl: './matchday-tips-our-picks-players-simplified.component.html',
  styleUrls: ['./matchday-tips-our-picks-players-simplified.component.scss']
})
export class MatchdayTipsOurPicksPlayersSimplifiedComponent {
  @Input() ourPicks: MatchdayTipsOurPicksPlayers;

  public get playersFound(): boolean {
    return !!this.ourPicks?.players && this.ourPicks.players.length > 0;
  }

  public isMobile$ = this.screenSizeService.isMobile$();
  public Types = MatchdayTipsOurPicksType;

  constructor(private screenSizeService: ScreenSizeService) {}
}
