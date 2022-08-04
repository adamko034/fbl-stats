import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';

@Component({
  selector: 'app-our-picks-players-table',
  templateUrl: './our-picks-players-table.component.html',
  styleUrls: ['./our-picks-players-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksPlayersTableComponent {
  @Input() players: MatchdayTipsOurPicksPlayer[];
  @Input() title: string;

  public Types = MatchdayTipsOurPicksType;

  constructor() {}
}
