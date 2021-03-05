import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';

@Component({
  selector: 'app-our-pick-icon',
  templateUrl: './our-pick-icon.component.html',
  styleUrls: ['./our-pick-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPickIconComponent {
  @Input() icon: OurPicksType;
  @Input() color;
  @Input() showTooltip = true;

  public Icons = OurPicksType;

  constructor() {}
}
