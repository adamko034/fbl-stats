import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';

@Component({
  selector: 'app-our-pick-icon',
  templateUrl: './our-pick-icon.component.html',
  styleUrls: ['./our-pick-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPickIconComponent {
  @Input() icon: MatchdayTipsOurPicksType;
  @Input() color;
  @Input() showTooltip = true;

  public Icons = MatchdayTipsOurPicksType;

  constructor() {}
}
