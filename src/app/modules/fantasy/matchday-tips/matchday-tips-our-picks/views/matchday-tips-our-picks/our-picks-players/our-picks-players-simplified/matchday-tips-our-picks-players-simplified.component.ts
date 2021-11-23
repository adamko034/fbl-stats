import { Component, Input } from '@angular/core';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-matchday-tips-our-picks-players-simplified',
  templateUrl: './matchday-tips-our-picks-players-simplified.component.html',
  styleUrls: ['./matchday-tips-our-picks-players-simplified.component.scss']
})
export class MatchdayTipsOurPicksPlayersSimplifiedComponent {
  @Input() ourPicks: OurPicksPlayers;

  public get playersFound(): boolean {
    return !!this.ourPicks?.players && this.ourPicks.players.length > 0;
  }

  public isMobile$ = this.screenSizeService.isMobile$();
  public Types = OurPicksType;

  constructor(private screenSizeService: ScreenSizeService) {}
}
