import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';

@Component({
  selector: 'app-matchday-tips-our-picks-player-extended',
  templateUrl: './matchday-tips-our-picks-player-extended.component.html',
  styleUrls: ['./matchday-tips-our-picks-player-extended.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksPlayerExtendedComponent implements OnInit {
  @Input() player: MatchdayTipsOurPicksPlayer;

  public Icons = MatchdayTipsOurPicksType;

  constructor(private playersDataService: PlayersDataService) {}

  ngOnInit(): void {}

  public getPointsColor(points: number) {
    return this.playersDataService.getPointsColor(points);
  }
}
