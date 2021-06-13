import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';

@Component({
  selector: 'app-our-picks-matchday-description',
  templateUrl: './our-picks-matchday-description.component.html',
  styleUrls: ['./our-picks-matchday-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksMatchdayDescriptionComponent {
  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'Must have' },
    { icon: 'premium', description: 'Premium pick' },
    { icon: 'bargain', description: 'Bargain pick' },
    { icon: 'differential', description: 'Differential (max popularity 5%)' },
    { icon: OurPicksType.SURPRISING, description: 'Surprising pick' }
  ];

  constructor() {}
}
