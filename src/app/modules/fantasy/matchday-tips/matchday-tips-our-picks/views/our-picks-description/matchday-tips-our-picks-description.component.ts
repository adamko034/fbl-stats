import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matchday-tips-our-picks-description',
  templateUrl: './matchday-tips-our-picks-description.component.html',
  styleUrls: ['./matchday-tips-our-picks-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksDescriptionComponent {
  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'Must have' },
    { icon: 'bargain', description: 'Budget pick' },
    { icon: 'differential', description: 'Differential' }
  ];

  constructor() {}
}
