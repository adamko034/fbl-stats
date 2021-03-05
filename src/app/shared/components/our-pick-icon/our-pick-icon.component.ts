import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-our-pick-icon',
  templateUrl: './our-pick-icon.component.html',
  styleUrls: ['./our-pick-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPickIconComponent {
  @Input() icon: 'mustHave' | 'premium' | 'bargain' | 'differential';
  @Input() color;
  @Input() showTooltip = true;

  constructor() {}
}