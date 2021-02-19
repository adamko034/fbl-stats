import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-our-pick-icon',
  templateUrl: './our-pick-icon.component.html',
  styleUrls: ['./our-pick-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPickIconComponent {
  @Input() icon: 'mustHave' | 'premium' | 'bargain' | 'differential';

  constructor() {}
}
