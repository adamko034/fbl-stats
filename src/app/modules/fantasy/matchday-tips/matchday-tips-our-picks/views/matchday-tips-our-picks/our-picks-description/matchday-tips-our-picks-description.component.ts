import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';

@Component({
  selector: 'app-matchday-tips-our-picks-description',
  templateUrl: './matchday-tips-our-picks-description.component.html',
  styleUrls: ['./matchday-tips-our-picks-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksDescriptionComponent {
  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'Must have' },
    { icon: 'premium', description: 'Premium pick' },
    { icon: 'bargain', description: 'Bargain pick' },
    { icon: 'differential', description: 'Differential (max popularity 5%)' },
    { icon: MatchdayTipsOurPicksType.SURPRISING, description: 'Surprising pick' }
  ];

  constructor() {}
}
